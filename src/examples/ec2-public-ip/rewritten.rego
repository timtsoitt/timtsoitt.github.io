package main

import rego.v1

deny contains msg if {
    some resource in input.resource_changes
    resource.mode == "managed"
    resource.type == "aws_instance"
    resource.change.after.associate_public_ip_address == true
    introduces_public_ip(resource.change)

    msg := sprintf("%s must not enable a public IP", [resource.address])
}

# A new resource has no existing setting to preserve.
introduces_public_ip(change) if {
    change.actions == ["create"]
}

# Updates and replacements must change the setting from false to true.
introduces_public_ip(change) if {
    change.actions in {
        ["update"],
        ["delete", "create"],
        ["create", "delete"],
    }
    change.before.associate_public_ip_address == false
}
