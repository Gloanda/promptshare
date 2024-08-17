variable "aws_region" {
  type        = string
  description = "The AWS region to deploy in"
}

variable "aws_ami_id" {
  type        = string
  description = "The AWS AMI ID used for EC2 instance"
}

variable "aws_public_key" {
  type        = string
  description = "The public key used to SSH into EC2 instance"
}