package main

import rego.v1

deny contains msg if {
    some resource in input.resource_changes
    resource.mode == "managed"
    resource.type == "aws_instance"
    resource.change.after.associate_public_ip_address == true

    msg := sprintf("%s must not have a public IP", [resource.address])
}
