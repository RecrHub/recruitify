# Configure the Azure provider
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
  }

  required_version = ">= 1.1.0"
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "rg" {
  name     = "myTFResourceGroup"
  location = "westus2"
}

# VNet
resource "azurerm_virtual_network" "main" {
  name                = "recruitify-vnet"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  address_space       = ["10.0.0.0/16"]
}

# Subnet cho PostgreSQL
resource "azurerm_subnet" "postgres" {
  name                 = "postgres-subnet"
  resource_group_name  = azurerm_resource_group.rg.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.0.1.0/24"]

  delegation {
    name = "postgresql"
    service_delegation {
      name    = "Microsoft.DBforPostgreSQL/flexibleServers"
      actions = ["Microsoft.Network/virtualNetworks/subnets/join/action"]
    }
  }
}

# Database module
module "database" {
  source = "../../modules/database"

  name_prefix         = "recruitify"
  random_suffix       = "001"
  resource_group_name = azurerm_resource_group.rg.name
  region              = azurerm_resource_group.rg.location
  network_id          = azurerm_virtual_network.main.id
  delegated_subnet_id = azurerm_subnet.postgres.id
  db_password           = var.db_password
  public_access_enabled = true  # Tạm bật để migrate, tắt sau
}

# Firewall rule - cho phép tất cả IP (tạm thời để migrate)
resource "azurerm_postgresql_flexible_server_firewall_rule" "allow_all" {
  name             = "allow-all-temp"
  server_id        = module.database.server_id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "255.255.255.255"
}

variable "db_password" {
  description = "Database administrator password"
  type        = string
  sensitive   = true
}

output "db_connection_string" {
  value = module.database.connection_string
}

output "db_server_fqdn" {
  value = module.database.server_fqdn
}
