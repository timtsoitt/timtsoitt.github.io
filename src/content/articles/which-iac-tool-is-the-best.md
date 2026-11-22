---
title: "Which IaC tool is the best?"
description: "OpenTofu/Terraform is my default. I switch tools when the job calls for it."
date: 2026-11-23
tags:
  [
    OpenTofu,
    Terraform,
    CloudFormation,
    Pulumi,
    AWS CDK,
    Crossplane,
    Infrastructure as Code,
  ]
---

I’ve used a lot of infrastructure as code (IaC) tools. The one I reach for depends on what I’m deploying, who owns the resources, and what needs to happen after the first deploy. Most of my examples are on AWS, from bootstrapping new accounts to managing installs in customer environments.

Here’s how I choose an IaC tool for a deployment on AWS.

<figure class="iac-mindmap">
  <picture>
    <source media="(max-width: 760px)" srcset="/diagrams/aws-iac-choices-compact.svg" width="420" height="622" />
    <img class="iac-mindmap-image" src="/diagrams/aws-iac-choices.svg" width="1190" height="464" alt="AWS IaC decision diagram. For customer environments, consider Pulumi when you need to control the deployment workflow. Use StackSets for standard rollouts of the same CloudFormation template across accounts or Regions, and OpenTofu/Terraform for other standard customer deployments. For in-house environments, use StackSets for account bootstrapping, resource-specific controllers for application resources with a shared lifecycle on Kubernetes, and OpenTofu/Terraform for other resources." draggable="false" />
  </picture>
</figure>

## IaC approaches

The diagram groups the main IaC approaches for cloud infrastructure, with examples from major cloud providers.

<figure class="iac-family-tree" data-iac-tree aria-labelledby="iac-tree-title">
<div class="iac-tree-controls" data-iac-controls hidden>
  <span class="iac-tree-label" id="iac-filter-label">HIGHLIGHT BY CHARACTERISTIC</span>
  <div class="iac-tree-filters" role="group" aria-labelledby="iac-filter-label"><button type="button" data-iac-filter="aws" aria-pressed="false">AWS</button><button type="button" data-iac-filter="azure" aria-pressed="false">Azure</button><button type="button" data-iac-filter="multi" aria-pressed="false">Cloud agnostic</button><button type="button" data-iac-filter="cncf" aria-pressed="false">CNCF</button><button type="button" data-iac-filter="oss" aria-pressed="false">Open source</button><button type="button" data-iac-reset>Reset</button></div>
  <p class="iac-tree-status" data-iac-status aria-hidden="true">Select a characteristic to highlight matching tools.</p>
  <span class="iac-tree-announcement" data-iac-announcement role="status" aria-live="polite" aria-atomic="true"></span>
</div>
<div class="iac-tree-root"><strong id="iac-tree-title">IaC approaches</strong></div>
<ul class="iac-tree-branches"><li class="iac-tree-branch"><div class="iac-tree-branch-heading"><strong>Configuration Languages</strong></div><ul class="iac-tree-config-branches"><li class="iac-tree-branch"><div class="iac-tree-branch-heading"><strong>HCL</strong><span>A configuration language developed by HashiCorp.</span></div><ul class="iac-tree-groups"><li class="iac-tree-group"><div class="iac-tree-tool" data-iac-traits="community multi oss aws azure cncf">
  <strong><a href="https://opentofu.org/">OpenTofu</a></strong>
  <p class="iac-tree-tool-description">Community-governed Terraform fork.</p>
  <div class="iac-tree-badges"><span>Cloud agnostic</span><span>CNCF project</span></div>
</div><div class="iac-tree-tool" data-iac-traits="vendor multi aws azure">
  <strong><a href="https://developer.hashicorp.com/terraform">Terraform</a></strong>
  <p class="iac-tree-tool-description">Developed by HashiCorp and licensed under BUSL 1.1.</p>
  <div class="iac-tree-badges"><span>Cloud agnostic</span><span>Tool vendor</span></div>
</div></li></ul></li><li class="iac-tree-branch"><div class="iac-tree-branch-heading"><strong>YAML / JSON</strong></div><ul class="iac-tree-subbranches"><li class="iac-tree-subbranch"><div class="iac-tree-subbranch-heading"><strong>Cloud-native templates</strong><span>Submit templates to the cloud provider’s deployment service.</span></div><div class="iac-tree-group"><div class="iac-tree-tool" data-iac-traits="provider aws">
  <strong><a href="https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/what-is-cfnstacksets.html">CloudFormation · StackSets</a></strong>
  <p class="iac-tree-tool-description">Developed by AWS, with StackSets for cross-account deployment.</p>
  <div class="iac-tree-badges"><span>AWS</span></div>
</div><div class="iac-tree-tool" data-iac-traits="provider azure">
  <strong><a href="https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/overview">Azure ARM templates</a></strong>
  <p class="iac-tree-tool-description">Native JSON templates for Azure Resource Manager.</p>
  <div class="iac-tree-badges"><span>Azure</span></div>
</div><div class="iac-tree-tool" data-iac-traits="provider azure oss">
  <strong><a href="https://github.com/Azure/bicep">Azure Bicep</a></strong>
  <p class="iac-tree-tool-description">Microsoft’s declarative language that compiles to ARM JSON. Licensed under MIT.</p>
  <div class="iac-tree-badges"><span>Azure</span><span>Open source</span></div>
</div></div></li><li class="iac-tree-subbranch iac-tree-has-scopes"><div class="iac-tree-subbranch-heading"><strong>Kubernetes manifests</strong><span>In-cluster controllers reconcile cloud resources with your manifests.</span></div><ul class="iac-tree-scope-branches">
<li class="iac-tree-scope-branch">
  <div class="iac-tree-scope-heading">
  <h3 class="iac-tree-scope-title">General-purpose provisioning</h3>
  <p class="iac-tree-scope-description">Manage cloud resources for platforms or applications.</p>
  </div>
  <div class="iac-tree-group iac-tree-scope-tools">
<div class="iac-tree-tool" data-iac-traits="community multi oss aws azure cncf">
    <strong><a href="https://www.crossplane.io/">Crossplane</a></strong>
    <p class="iac-tree-tool-description">Created by Upbound and licensed under Apache 2.0.</p>
    <div class="iac-tree-badges"><span>Cloud agnostic</span><span>CNCF project</span></div>
  </div>
  </div>
</li>
<li class="iac-tree-scope-branch">
  <div class="iac-tree-scope-heading">
  <h3 class="iac-tree-scope-title">Resource-specific controllers</h3>
  <p class="iac-tree-scope-description">Manage specific resources, such as DNS records or load balancers.</p>
  </div>
  <div class="iac-tree-group iac-tree-scope-tools">
    <span class="iac-tree-label">REPRESENTATIVE EXAMPLES</span>
<div class="iac-tree-tool" data-iac-traits="community multi oss aws azure">
    <strong><a href="https://github.com/kubernetes-sigs/external-dns">ExternalDNS</a></strong>
    <p class="iac-tree-tool-description">Maintained by the Kubernetes SIGs community.</p>
    <div class="iac-tree-badges"><span>Cloud agnostic</span><span>Community governed</span><span>Open source</span></div>
  </div>
<div class="iac-tree-tool" data-iac-traits="provider aws oss">
    <strong><a href="https://kubernetes-sigs.github.io/aws-load-balancer-controller/">AWS Load Balancer Controller</a></strong>
    <p class="iac-tree-tool-description">Developed by AWS for Kubernetes.</p>
    <div class="iac-tree-badges"><span>AWS</span><span>Open source</span></div>
  </div>
  </div>
</li>
</ul></li></ul></li></ul></li><li class="iac-tree-branch"><div class="iac-tree-branch-heading"><strong>General-purpose programming languages</strong></div><ul class="iac-tree-groups"><li class="iac-tree-group"><div class="iac-tree-tool" data-iac-traits="vendor multi oss aws azure">
  <strong><a href="https://www.pulumi.com/">Pulumi</a></strong>
  <p class="iac-tree-tool-description">Developed by Pulumi and licensed under Apache 2.0.</p>
  <div class="iac-tree-badges"><span>Cloud agnostic</span><span>Open source</span><span>Tool vendor</span></div>
</div><div class="iac-tree-tool" data-iac-traits="provider aws oss">
  <strong><a href="https://docs.aws.amazon.com/cdk/v2/guide/home.html">AWS CDK</a></strong>
  <p class="iac-tree-tool-description">Developed by AWS and licensed under Apache 2.0.</p>
  <div class="iac-tree-badges"><span>AWS</span><span>Open source</span></div>
</div></li></ul></li></ul>
</figure>

## My choices

### OpenTofu/Terraform: my go-to default

My reasons for choosing OpenTofu and Terraform come down to HCL, the configuration language they share. The fork doesn’t change that.

HCL is the Python of IaC. It’s easy to pick up, read, and write.

<div class="code-example code-example--panel" role="group" aria-labelledby="sqs-queue-example">
<h4 class="code-example-title" id="sqs-queue-example">Writing HCL</h4>
<div class="code-example-text">

Writing a resource in HCL feels like filling in a form. The provider defines the fields, so everyone on the team starts with the same structure.

For this [SQS queue](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sqs_queue), the argument names tell me what to fill in, right down to the units for timeouts and retention. I can’t think of a simpler way to define it.

</div>
<div class="code-example-code">
<p class="code-example-label">SQS queue configuration</p>

```hcl
resource "aws_sqs_queue" "this" {
  name                       = "app-jobs"
  visibility_timeout_seconds = 60
  message_retention_seconds  = 3600

  tags = {
    Environment = "production"
  }
}
```

</div>
</div>

<div class="code-example code-example--panel" role="group" aria-labelledby="s3-bucket-plan-example">
<h4 class="code-example-title" id="s3-bucket-plan-example">Reviewing changes</h4>
<div class="code-example-text">

The plan shows me what’s about to change without making me trace the author’s HCL. OpenTofu and Terraform give reviewers a consistent view, whoever wrote the code.

In this shortened example, the `+` marks an S3 bucket to be created. The [plan summary](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/aws-manage#input-variables) shows that’s the only change.

</div>
<div class="code-example-code">
<p class="code-example-label">S3 bucket creation plan</p>

```text
Terraform will perform the following actions:

  # aws_s3_bucket.logs will be created
  + resource "aws_s3_bucket" "logs" {
      + arn    = (known after apply)
      + bucket = "example-app-logs"
      + id     = (known after apply)
    }

Plan: 1 to add, 0 to change, 0 to destroy.
```

</div>
</div>

HCL’s constraints make the simplest resource definition the obvious one. In a codebase shared by hundreds or thousands of developers and operators, having fewer ways to express the same thing makes the code easier to read and maintain. I spend less time working out how the author structured the code before I can review the change. Making infrastructure code harder to fuck up is a perfectly good reason to choose a tool.

### CloudFormation StackSets: bootstrapping AWS accounts

CloudFormation is terrible for day-to-day IaC. Deployments are super slow. When one fails, the rollback takes a century and then fails too.

Expand either example to see what makes routine changes such a pain.

<details class="code-example-disclosure">
<summary class="code-example-title" id="template-file-comparison">Bloated templates</summary>
<div class="code-example code-example--panel code-example--comparison">
<div class="code-example-intro">

A typical IaC project can easily have dozens of resource definitions. With OpenTofu/Terraform, I can group related resources in separate `.tf` files and reference them across files in the same directory.

CloudFormation reads one template per stack. In a plain YAML template, all those definitions go under the same `Resources` block. Once the file grows to thousands of lines, I’m jumping between scattered definitions just to make a small change. It’s hell to work in.

</div>
<div class="code-example-code">
<p class="code-example-label">OpenTofu/Terraform</p>

```text
report-service/
├── backend.tf
├── iam.tf
├── locals.tf
├── monitoring.tf
├── outputs.tf
├── providers.tf
├── queues.tf
├── variables.tf
└── versions.tf
```

</div>
<figure class="code-example-code">
<p class="code-example-label">CloudFormation</p>

```text
report-service/
└── template.yaml
```

<p class="code-example-label">CloudFormation template.yaml (excerpt)</p>

```yaml
Resources:
  ReportWorkerTask:
    Type: AWS::ECS::TaskDefinition
    Properties:
      Family: !Sub "${AWS::StackName}-worker"
      RequiresCompatibilities:
        - FARGATE
      NetworkMode: awsvpc
      Cpu: "512"
      Memory: "1024"
      ExecutionRoleArn: !GetAtt WorkerExecutionRole.Arn
      TaskRoleArn: !GetAtt WorkerTaskRole.Arn
      ContainerDefinitions:
        - Name: report-worker
          Image: !Ref WorkerImage
          Essential: true
          Environment:
            - Name: QUEUE_URL
              Value: !Ref ReportJobsQueue
            - Name: REPORT_BUCKET
              Value: !Ref ReportsBucket
          LogConfiguration:
            LogDriver: awslogs
            Options:
              awslogs-group: !Ref WorkerLogGroup
              awslogs-region: !Ref AWS::Region
              awslogs-stream-prefix: worker

  # ...
```

<figcaption>Now imagine 100 more resource definitions in this same file.</figcaption>
</figure>
</div>
</details>

<details class="code-example-disclosure" id="sqs-change-comparison">
<summary class="code-example-title" id="verbose-output">Verbose output</summary>
<div class="code-example code-example--panel code-example--comparison">
<div class="code-example-intro">

OpenTofu/Terraform prints its plan as a text diff. CloudFormation stores its preview as a change set that I can open in the AWS console or fetch as JSON.

Both excerpts show the same SQS visibility timeout change. Look at how much more the CloudFormation output makes me read to verify it.

</div>
<figure class="code-example-code">
<p class="code-example-label">OpenTofu/Terraform plan</p>

```text
  # aws_sqs_queue.this will be updated in-place
  ~ resource "aws_sqs_queue" "this" {
      ~ visibility_timeout_seconds = 60 -> 90
    }

Plan: 0 to add, 1 to change, 0 to destroy.
```

<figcaption><a href="https://developer.hashicorp.com/terraform/cli/commands/plan#understand-plan-output">Terraform plan documentation</a></figcaption>
</figure>
<figure class="code-example-code">
<p class="code-example-label">CloudFormation change set (AWS CLI, <code>--include-property-values</code>)</p>

```json
{
  "Changes": [
    {
      "Type": "Resource",
      "ResourceChange": {
        "Action": "Modify",
        "LogicalResourceId": "AppJobsQueue",
        "ResourceType": "AWS::SQS::Queue",
        "Replacement": "False",
        "Scope": ["Properties"],
        "Details": [
          {
            "Target": {
              "Attribute": "Properties",
              "Name": "VisibilityTimeout",
              "RequiresRecreation": "Never",
              "Path": "/Properties/VisibilityTimeout",
              "BeforeValue": "60",
              "AfterValue": "90",
              "AttributeChangeType": "Modify"
            },
            "Evaluation": "Static",
            "ChangeSource": "DirectModification"
          }
        ]
      }
    }
  ]
}
```

<figcaption><a href="https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-changesets-view.html">CloudFormation change set documentation</a></figcaption>
</figure>
</div>
</details>

Unless you’re a devout believer in first-party AWS support, I see no reason to choose CloudFormation over OpenTofu/Terraform, with one exception.

#### The account baseline

[CloudFormation StackSets](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/what-is-cfnstacksets.html) is my pick for rolling out the same baseline across AWS accounts and Regions. With service-managed permissions in AWS Organizations, [automatic deployment](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-manage-auto-deployment.html) applies that baseline as new accounts join the target organisation or organisational unit (OU).

That baseline could include [removing unused default VPCs](https://docs.aws.amazon.com/vpc/latest/userguide/delete-vpc.html) and [enabling EBS encryption by default](https://docs.aws.amazon.com/ebs/latest/userguide/encryption-by-default.html) in each target Region. The stack can make those EC2 API calls through a [Lambda-backed custom resource](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-custom-resources-lambda.html).

<aside class="callout callout--blue" aria-labelledby="terraform-bootstrap-example">
<h5 class="callout-label" id="terraform-bootstrap-example">Classic use case: Bootstrapping Terraform access</h5>

The CloudFormation template defines an IAM role with the permissions Terraform needs and a trust policy that lets the central runner assume it. IAM roles are account-wide, so the StackSet targets one Region per account for this role. Once the role is in place, the runner assumes it to manage the rest of that account’s infrastructure.

That’s right. It’s the IaC version of using Internet Explorer to download Chrome.

</aside>

### Kubernetes: use dedicated controllers to manage resources tied to the app

When a resource should come and go with a Kubernetes app, I reach for a resource-specific controller. A separate OpenTofu/Terraform workflow is usually an anti-pattern here. It’s one more thing to coordinate when I deploy, change, or remove the app.

Say `reports.example.com` points to an Application Load Balancer. Renaming the app’s Ingress group can cause the [AWS Load Balancer Controller to replace the load balancer](https://kubernetes-sigs.github.io/aws-load-balancer-controller/latest/guide/ingress/annotations/#ingressgroup). If Terraform manages the Route 53 alias separately, the record can still point to the old load balancer until the next apply updates it.

I prefer letting [ExternalDNS read the target from the Ingress](https://kubernetes-sigs.github.io/external-dns/latest/docs/faq/) and update Route 53 when it changes. In [sync mode](https://github.com/kubernetes-sigs/external-dns/blob/master/docs/tutorials/aws.md#clean-up), it can also clean up the record it owns when I remove the Ingress.

If the resource has a lifecycle of its own, I put it in OpenTofu/Terraform. That goes for shared VPCs and for a database that has to stay up after I remove the app.

#### Crossplane: a Swiss Army knife that you (almost) never need

As organisations adopt platform engineering, the split I want on Kubernetes is simple. The platform team runs the shared cluster, and app teams maintain the manifests for their own applications.

Crossplane is powerful. Its [AWS provider](https://github.com/crossplane-contrib/provider-upjet-aws) can manage everything from IAM roles to databases through Kubernetes. Give that provider an AWS admin role and let app teams submit unrestricted manifests, and you’ve opened a huge security hole. A routine app deploy can now create whatever AWS resources the provider supports or change infrastructure other teams depend on.

That leaves the platform team building guardrails for every AWS resource type it exposes. I can skip that work by leaving Crossplane out of shared clusters. OpenTofu/Terraform already handles platform resources, and resource-specific Kubernetes controllers take care of the DNS records and load balancers that come and go with each app.

Crossplane is a tool I’d save for a very specific problem. Even then, I want the people using the cluster to be the same people who already administer the AWS accounts it can access. That keeps the ability to act as an AWS admin within the group that already has it.

### General-purpose programming languages: can your engineers write code?

Pulumi lets us define infrastructure in a general-purpose language like TypeScript, Python, or Go. The more freedom you give people to write infrastructure code, the more you depend on their programming skills. People who work mainly on infrastructure tend to be weaker programmers than software engineers, who write code all day. Even among software engineers, most of us are average. Anyone who writes code has ranted about someone else’s.

Open that codebase to more teams on a shared platform, and you’ve got people with wildly different coding skills and tastes changing the same infrastructure. One team writes a small function while another builds a class hierarchy for the same thing. Now I’m reviewing the software design as well as the infrastructure change. Some will ship slop without understanding their code or the infrastructure it changes. You’re shooting yourself in the foot.

<aside class="callout" aria-labelledby="aws-cdk-note">
<p class="callout-label" id="aws-cdk-note">AWS-only deployments</p>

AWS CDK is an option. It still deploys through CloudFormation, which you should have learnt to avoid by now. Besides, Pulumi works across clouds, so I can keep using the same tool as my deployments grow beyond AWS.

</aside>

#### Deploying resources to customer environments

Pulumi gets my attention when I need to deploy and manage resources in a customer’s environment. I want the customer to start the install in as few steps as possible.

CloudFormation templates and the HCL I write for OpenTofu/Terraform are declarative. I specify the resources I want, their settings, and how they depend on each other. The deployment engine uses that definition to decide what to create, update, or remove and which resource operations have to run first.

A customer deployment often needs a workflow around provisioning. I might validate the customer’s settings before creating anything, run post-install tasks once the apps are up, and call an API to register the install after the health checks pass. If a check fails, the workflow has to decide whether to retry or stop.

Say I need to provision a Kubernetes cluster in a customer’s AWS account, then install several applications in it. Once they’re running, I assume IAM roles in the customer’s other AWS accounts to run health checks and collect metadata. With Pulumi, I can write the whole sequence in procedural code and control what happens at each step.

For example, I can give the customer a small CloudFormation template to launch as a single stack. The stack starts a job in their account that downloads and runs an installation script. The script fetches our Pulumi artifacts and starts the deployment. We manage the rest from there.

## Closing thoughts

Many engineering problems are best solved by combining approaches, and IaC is a good example.

These recommendations come from my own IaC work and from watching how other teams use it. I’ve seen people get so attached to one tool that they try to make it do everything and end up with a huge mess. Always pick the tool that fits each job.
