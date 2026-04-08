.PHONY: init plan apply destroy fmt validate output

init:
	@echo "$(GREEN)Initializing"
	terraform init upgrade

plan:
	terraform plan -var="db_password=$(DB_PASSWORD)"

apply:
	terraform apply -var="db_password=$(DB_PASSWORD)"

destroy:
	terraform destroy -var="db_password=$(DB_PASSWORD)"

fmt:
	terraform fmt -recursive

validate:
	terraform validate

output:
	terraform output
