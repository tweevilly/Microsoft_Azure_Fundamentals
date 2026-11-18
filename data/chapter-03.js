/*
 * AZ-900 Chapter 3: Describe Azure management and governance
 *
 * Four topic sets of 15 questions each (see `sets`). Question format is documented in chapter-01.js.
 */
(window.AZ900 = window.AZ900 || { chapters: [] }).chapters.push({
  id: "ch03",
  number: 3,
  title: "Describe Azure management and governance",
  sets: [
    { id: "cost", label: "Cost management" },
    { id: "governance", label: "Governance and compliance" },
    { id: "deploy", label: "Managing and deploying resources" },
    { id: "monitor", label: "Monitoring tools" },
  ],
  questions: [
    // ------------------------------------------------ Cost management (15)
    {
      id: "ch03-cost-q01",
      set: "cost",
      prompt:
        "A virtual machine of the same size costs more in one Azure region than in another. Which cost factor explains the difference?",
      options: ["Resource type", "Maintenance", "Geography", "Consumption"],
      answer: 2,
      explanation:
        "Prices vary by region because of local factors such as power, labor, and taxes. Geography is one of the main factors that affect Azure costs, along with resource type, consumption, and subscription type.",
    },
    {
      id: "ch03-cost-q02",
      set: "cost",
      prompt: "Which statement about data transfer (bandwidth) charges in Azure is generally true?",
      options: [
        "Inbound data to Azure is free, while outbound data is billed beyond a monthly allowance",
        "Outbound data leaving Azure is always free, while inbound data is billed per gigabyte",
        "Data transfer is free in both directions, no matter how much data moves",
        "Data transfer is billed only for virtual machines and never for storage accounts",
      ],
      answer: 0,
      explanation:
        "Data coming into Azure is typically free. Data leaving Azure (egress) is billed after a free monthly allowance, and the rate depends on the zone.",
    },
    {
      id: "ch03-cost-q03",
      set: "cost",
      prompt: "Which tool estimates the monthly cost of Azure services you plan to deploy?",
      options: [
        "Total Cost of Ownership (TCO) Calculator",
        "Pricing Calculator",
        "Azure Advisor",
        "Azure Service Health",
      ],
      answer: 1,
      explanation:
        "The Pricing Calculator lets you pick services, sizes, and regions and see an estimated cost before you deploy anything. The TCO Calculator compares on-premises costs with Azure.",
    },
    {
      id: "ch03-cost-q04",
      set: "cost",
      prompt:
        "Which tool compares the cost of running a workload in your own datacenter with running it in Azure?",
      options: [
        "Pricing Calculator",
        "Azure Advisor",
        "Microsoft Cost Management",
        "Total Cost of Ownership (TCO) Calculator",
      ],
      answer: 3,
      explanation:
        "The TCO Calculator takes your on-premises workload details (servers, storage, networking, licensing) and estimates the savings from moving them to Azure.",
    },
    {
      id: "ch03-cost-q05",
      set: "cost",
      prompt:
        "Which service lets you analyze spending, create budgets, and receive alerts as costs approach a limit?",
      options: [
        "Microsoft Cost Management",
        "Azure Policy",
        "Azure Service Health",
        "Azure Arc",
      ],
      answer: 0,
      explanation:
        "Microsoft Cost Management gives you cost analysis, budgets, alerts, and recommendations for the money you spend in Azure.",
    },
    {
      id: "ch03-cost-q06",
      set: "cost",
      prompt:
        "A team wants an email when monthly spending reaches 80 percent of an agreed amount. What should they configure?",
      options: [
        "A CanNotDelete lock on the subscription",
        "An Azure Policy initiative at the management group",
        "A budget with an alert condition in Cost Management",
        "A metric alert on the CPU of every virtual machine",
      ],
      answer: 2,
      explanation:
        "Budgets in Microsoft Cost Management can trigger alerts at percentages of the budgeted amount, notifying people by email or through an action group.",
    },
    {
      id: "ch03-cost-q07",
      set: "cost",
      prompt: "What are tags in Azure used for?",
      options: [
        "Granting users the permissions they need to perform actions on Azure resources",
        "Adding name and value metadata to resources so they can be organized and costs grouped",
        "Encrypting a resource's data with a key that the customer manages in Key Vault",
        "Moving resources automatically between regions to balance load across datacenters",
      ],
      answer: 1,
      explanation:
        "Tags are name/value pairs, such as Department = Finance, that you attach to resources. They help you organize resources and group costs in reports.",
    },
    {
      id: "ch03-cost-q08",
      set: "cost",
      prompt: "By default, what happens to a tag that is applied to a resource group?",
      options: [
        "Every resource in the group automatically inherits the tag",
        "The tag is deleted as soon as the first resource is added",
        "The tag is copied to every resource group in the subscription",
        "The resources in the group do not inherit the tag automatically",
      ],
      answer: 3,
      explanation:
        "Tags on a resource group are not inherited by the resources inside it by default. You can apply tags to each resource, or use Azure Policy to add or inherit them.",
      hint: "Unlike locks and policies, tags do not flow down on their own.",
    },
    {
      id: "ch03-cost-q09",
      set: "cost",
      prompt:
        "Which option gives a discount in return for committing to use specific Azure resources for one or three years?",
      options: [
        "Pay-as-you-go pricing",
        "The Azure free account",
        "Azure Reservations",
        "Azure Spot pricing",
      ],
      answer: 2,
      explanation:
        "Azure Reservations (such as reserved VM instances) trade a one- or three-year commitment for a lower price than pay-as-you-go.",
    },
    {
      id: "ch03-cost-q10",
      set: "cost",
      prompt: "What does Azure Hybrid Benefit let you do?",
      options: [
        "Reuse existing Windows Server or SQL Server licenses with Software Assurance in Azure",
        "Pay for Azure resources using an on-premises purchase order instead of a credit card",
        "Run any workload at no charge as long as a copy of it also runs on-premises",
        "Move virtual machines between regions without paying data transfer or compute charges",
      ],
      answer: 0,
      explanation:
        "Azure Hybrid Benefit lets you apply eligible on-premises Windows Server and SQL Server licenses (with Software Assurance) to Azure resources and pay a lower rate.",
    },
    {
      id: "ch03-cost-q11",
      set: "cost",
      prompt: "Which statement describes pay-as-you-go pricing?",
      options: [
        "You commit to a fixed amount of usage for one or three years in return for a discount",
        "You are billed for the resources you actually use, with no upfront commitment",
        "You prepay for a full year of usage and cannot change the amount during that time",
        "You pay only for support plans and never for the resources you run",
      ],
      answer: 1,
      explanation:
        "Pay-as-you-go bills for actual consumption with no commitment, which is flexible but usually costs more per unit than a reservation.",
    },
    {
      id: "ch03-cost-q12",
      set: "cost",
      prompt: "What does an Azure free account provide?",
      options: [
        "Unlimited free use of every Azure service for the first year after sign-up",
        "Free ExpressRoute circuits and VPN gateways for the first month of use",
        "A permanent free support plan that covers every Azure service you deploy",
        "Credit to explore Azure for a limited time, plus some services that stay free",
      ],
      answer: 3,
      explanation:
        "A free account includes credit to try Azure for a limited period, some popular services free for 12 months, and a set of services that are always free within usage limits.",
    },
    {
      id: "ch03-cost-q13",
      set: "cost",
      prompt:
        "Which Cost Management feature shows spending broken down by resource, resource group, or tag?",
      options: ["Budgets", "Advisor score", "Cost analysis", "Resource health"],
      answer: 2,
      explanation:
        "Cost analysis lets you explore and filter your spending by dimensions such as resource, resource group, service, location, or tag.",
    },
    {
      id: "ch03-cost-q14",
      set: "cost",
      prompt:
        "Which service recommends cost savings, such as resizing or shutting down underused virtual machines?",
      options: [
        "Azure Advisor",
        "Azure Policy",
        "Azure Arc",
        "Azure Resource Manager",
      ],
      answer: 0,
      explanation:
        "Azure Advisor analyzes your usage and gives recommendations in categories that include cost, such as right-sizing or removing idle resources.",
    },
    {
      id: "ch03-cost-q15",
      set: "cost",
      prompt:
        "A virtual machine is not needed overnight. What should be done so that its compute charges stop?",
      options: [
        "Shut down the guest operating system from inside the VM",
        "Stop the VM in Azure so that it becomes deallocated",
        "Delete the network security group attached to the VM",
        "Move the VM to a different resource group",
      ],
      answer: 1,
      explanation:
        "Shutting down from inside the OS leaves the VM allocated and still billed for compute. Stopping it in Azure deallocates it and compute charges stop, though its disks still incur storage charges.",
    },

    // ------------------------------------------------ Governance and compliance (15)
    {
      id: "ch03-governance-q01",
      set: "governance",
      prompt: "What is the main purpose of Azure Policy?",
      options: [
        "To grant users the permissions they need to perform actions on Azure resources",
        "To monitor the CPU and memory use of virtual machines and raise alerts",
        "To estimate the monthly cost of resources before they are deployed",
        "To enforce organizational standards and assess resource compliance at scale",
      ],
      answer: 3,
      explanation:
        "Azure Policy evaluates resources against rules you define, enforces standards such as allowed regions, and reports how compliant your environment is.",
    },
    {
      id: "ch03-governance-q02",
      set: "governance",
      prompt: "Which requirement could be enforced with Azure Policy?",
      options: [
        "Only members of the finance team may view the billing details for a subscription",
        "All virtual machines must be created in approved regions and sizes",
        "Every user must sign in with a hardware security key instead of a password",
        "Backups of every virtual machine must run each night at midnight",
      ],
      answer: 1,
      explanation:
        "Restricting which regions and VM sizes can be used is a classic policy. Who can view billing is RBAC, and sign-in rules are Conditional Access.",
    },
    {
      id: "ch03-governance-q03",
      set: "governance",
      prompt: "How does Azure Policy differ from Azure RBAC?",
      options: [
        "Policy governs which resource configurations are allowed; RBAC governs what users can do",
        "Policy controls who can sign in to Azure; RBAC controls which regions a subscription can use",
        "Policy applies only to user accounts; RBAC applies only to resource configurations",
        "Policy and RBAC do the same job, so they can be used interchangeably in any scenario",
      ],
      answer: 0,
      explanation:
        "RBAC answers \"what can this user do?\" Policy answers \"what resources and settings are allowed?\" even for users who have permission to deploy.",
    },
    {
      id: "ch03-governance-q04",
      set: "governance",
      prompt: "What is an Azure Policy initiative?",
      options: [
        "A single rule that stops anyone from deleting a resource in a production group",
        "A report that lists every user who has access to resources in a subscription",
        "A collection of policy definitions grouped together to achieve a larger goal",
        "A template that declares which resources should be deployed to a resource group",
      ],
      answer: 2,
      explanation:
        "An initiative bundles related policy definitions (for example, everything needed for a regulatory standard) so they can be assigned and tracked together.",
    },
    {
      id: "ch03-governance-q05",
      set: "governance",
      prompt: "What does Azure Policy do with existing resources that do not comply with an assigned policy?",
      options: [
        "Deletes them automatically at the end of the day so that the environment stays clean",
        "Moves them to a separate subscription so that an administrator can review them later",
        "Converts them to a supported configuration immediately without any remediation task",
        "Flags them as noncompliant, and a remediation task can bring them into compliance",
      ],
      answer: 3,
      explanation:
        "Existing resources are evaluated and reported as noncompliant rather than deleted. Some policies support remediation tasks that fix them.",
    },
    {
      id: "ch03-governance-q06",
      set: "governance",
      prompt: "What is the purpose of a resource lock?",
      options: [
        "To encrypt the data that is stored inside a resource with a key that you manage",
        "To prevent resources from being accidentally deleted or changed by users",
        "To restrict which Azure regions can be used when new resources are created",
        "To limit how much a subscription can spend before further deployments stop",
      ],
      answer: 1,
      explanation:
        "Locks protect resources from accidental deletion or modification, even by people who otherwise have permission to do so.",
    },
    {
      id: "ch03-governance-q07",
      set: "governance",
      prompt:
        "Which lock level lets users read and modify a resource but prevents them from deleting it?",
      options: ["CanNotDelete", "ReadOnly", "Contributor", "Owner"],
      answer: 0,
      explanation:
        "CanNotDelete allows reads and changes but blocks deletion. ReadOnly blocks both changes and deletion. Contributor and Owner are RBAC roles, not lock levels.",
      hint: "The name says what is blocked.",
    },
    {
      id: "ch03-governance-q08",
      set: "governance",
      prompt: "Who is affected by a resource lock?",
      options: [
        "Only users who have been assigned the Reader role on the resource",
        "Only guest users who were invited from other organizations",
        "All users and roles, including people who have the Owner role",
        "Only users who sign in without using multifactor authentication",
      ],
      answer: 2,
      explanation:
        "A lock applies to everyone regardless of their RBAC role. An Owner must remove the lock first before deleting or changing the locked resource.",
    },
    {
      id: "ch03-governance-q09",
      set: "governance",
      prompt: "A ReadOnly lock is applied to a resource group. What happens to the resources in that group?",
      options: [
        "They are unaffected until each one is given its own lock",
        "They are deleted if no one renews the lock after thirty days",
        "They are moved to a different resource group automatically",
        "They inherit the lock, so they cannot be changed or deleted",
      ],
      answer: 3,
      explanation:
        "Locks are inherited. A lock on a resource group applies to every resource inside it, including resources added later.",
    },
    {
      id: "ch03-governance-q10",
      set: "governance",
      prompt:
        "Which service helps you govern data across on-premises, multicloud, and SaaS sources by discovering and classifying it?",
      options: [
        "Azure Policy",
        "Microsoft Purview",
        "Azure Monitor",
        "Microsoft Defender for Cloud",
      ],
      answer: 1,
      explanation:
        "Microsoft Purview is a data governance and compliance service. It maps data across your estate, classifies sensitive data, and helps you manage risk.",
    },
    {
      id: "ch03-governance-q11",
      set: "governance",
      prompt:
        "A company wants one place to see where its sensitive data lives and to classify it across Azure, on-premises databases, and SaaS apps. Which service fits?",
      options: [
        "Microsoft Purview",
        "Azure Advisor",
        "Azure Arc",
        "Network security groups",
      ],
      answer: 0,
      explanation:
        "Discovering and classifying data across many sources is what Microsoft Purview is built for.",
    },
    {
      id: "ch03-governance-q12",
      set: "governance",
      prompt:
        "Where can you find Microsoft's audit reports, compliance certifications, and other trust documentation?",
      options: [
        "Azure Advisor",
        "Microsoft Cost Management",
        "Service Trust Portal",
        "Azure Service Health",
      ],
      answer: 2,
      explanation:
        "The Service Trust Portal publishes audit reports, certifications, and guidance on how Microsoft cloud services meet compliance standards.",
    },
    {
      id: "ch03-governance-q13",
      set: "governance",
      prompt: "Where can you see the overall compliance state of your resources against the policies assigned to them?",
      options: [
        "The Azure Advisor score page",
        "The resource health page of a virtual machine",
        "The cost analysis view in Cost Management",
        "The compliance dashboard in Azure Policy",
      ],
      answer: 3,
      explanation:
        "Azure Policy has a compliance dashboard that shows compliant and noncompliant resources for each assignment and initiative.",
    },
    {
      id: "ch03-governance-q14",
      set: "governance",
      prompt: "At which scopes can an Azure Policy be assigned?",
      options: [
        "Only at the level of individual resources inside a resource group",
        "At a management group, a subscription, or a resource group",
        "Only at the level of an Azure region, such as East US or West Europe",
        "Only at the level of the Microsoft Entra tenant that owns the subscription",
      ],
      answer: 1,
      explanation:
        "Policies can be assigned at a management group, subscription, or resource group and are inherited by everything below that scope.",
    },
    {
      id: "ch03-governance-q15",
      set: "governance",
      prompt:
        "An administrator must stop anyone from accidentally deleting a production database while still allowing configuration changes. What should be applied?",
      options: [
        "A CanNotDelete lock",
        "A ReadOnly lock",
        "An Azure Policy that denies all changes",
        "A budget alert",
      ],
      answer: 0,
      explanation:
        "A CanNotDelete lock blocks deletion but still permits changes. A ReadOnly lock would also block configuration changes.",
    },

    // ------------------------------------------------ Managing and deploying resources (15)
    {
      id: "ch03-deploy-q01",
      set: "deploy",
      prompt: "What is the Azure portal?",
      options: [
        "A command-line tool that is used for scripting repeatable resource deployments",
        "A file format that is used for describing the resources to be deployed",
        "A web-based console for creating, managing, and monitoring resources",
        "A mobile-only application that is used for viewing billing information",
      ],
      answer: 2,
      explanation:
        "The Azure portal is the browser-based graphical interface for working with almost every Azure service.",
    },
    {
      id: "ch03-deploy-q02",
      set: "deploy",
      prompt: "What is Azure Cloud Shell?",
      options: [
        "A browser-based shell for managing Azure, using Bash or PowerShell, with no local install",
        "A physical device that Microsoft ships to connect an office network to Azure",
        "A migration tool that converts virtual machines into containers automatically",
        "A security feature that hides resources from the public internet by default",
      ],
      answer: 0,
      explanation:
        "Cloud Shell gives you an authenticated Bash or PowerShell session in your browser with Azure CLI and Azure PowerShell already installed.",
    },
    {
      id: "ch03-deploy-q03",
      set: "deploy",
      prompt: "Which tool uses commands that start with \"az\", such as az group create?",
      options: ["Azure PowerShell", "Bicep", "Azure portal", "Azure CLI"],
      answer: 3,
      explanation: "Azure CLI commands start with az. Azure PowerShell uses cmdlets with an Az prefix, such as New-AzResourceGroup.",
    },
    {
      id: "ch03-deploy-q04",
      set: "deploy",
      prompt: "Which tool uses cmdlets with names such as New-AzResourceGroup?",
      options: ["Azure CLI", "Azure PowerShell", "Bicep", "Azure portal"],
      answer: 1,
      explanation: "Azure PowerShell is a set of cmdlets, named with the Az prefix, for managing Azure resources from PowerShell.",
    },
    {
      id: "ch03-deploy-q05",
      set: "deploy",
      prompt: "Which statement about Azure CLI and Azure PowerShell is true?",
      options: [
        "Azure CLI runs only on Linux computers, and Azure PowerShell runs only on Windows computers",
        "Both can be used only from inside the Azure portal and not from a local computer",
        "Both run on Windows, macOS, and Linux and can be scripted to automate management tasks",
        "Neither one can create resources, because both are limited to reading information",
      ],
      answer: 2,
      explanation:
        "Both tools are cross-platform and can create, change, and delete resources, so either can be scripted to automate tasks.",
    },
    {
      id: "ch03-deploy-q06",
      set: "deploy",
      prompt:
        "An administrator needs to create the same set of resources every night without clicking through screens. What is the best approach?",
      options: [
        "Write a script that uses Azure CLI or Azure PowerShell to create them",
        "Repeat the same steps manually in the Azure portal every night",
        "Open a support request each night asking Microsoft to create the resources",
        "Ask Azure Advisor to deploy the resources on a nightly schedule",
      ],
      answer: 0,
      explanation:
        "Scripts (or templates) can be scheduled and repeated reliably. The portal is interactive, and Advisor only gives recommendations.",
    },
    {
      id: "ch03-deploy-q07",
      set: "deploy",
      prompt:
        "Which service extends Azure management and governance to servers, Kubernetes clusters, and databases running outside Azure?",
      options: [
        "Azure Policy",
        "Azure Resource Manager",
        "Azure Cloud Shell",
        "Azure Arc",
      ],
      answer: 3,
      explanation:
        "Azure Arc projects resources that run on-premises, at the edge, or in other clouds into Azure so you can manage them with Azure tools.",
    },
    {
      id: "ch03-deploy-q08",
      set: "deploy",
      prompt:
        "A company runs servers in its own datacenter and in another cloud. It wants to manage them with Azure tools such as tags and Azure Policy. Which service enables this?",
      options: [
        "Azure Migrate",
        "Azure Arc",
        "Azure Data Box",
        "Azure Functions",
      ],
      answer: 1,
      explanation:
        "Azure Arc connects non-Azure servers to Azure, where they can be tagged, governed with Azure Policy, and monitored like native resources.",
    },
    {
      id: "ch03-deploy-q09",
      set: "deploy",
      prompt: "What is an Azure Resource Manager (ARM) template?",
      options: [
        "A form in the Azure portal that estimates the cost of the resources you select",
        "A script that can only be run from inside the Azure Cloud Shell environment",
        "A JSON file that declares the resources to deploy and how they are configured",
        "A policy definition that stops resources from being deleted by mistake",
      ],
      answer: 2,
      explanation:
        "An ARM template is a JSON file that describes the resources you want and their settings, and Azure Resource Manager deploys them.",
    },
    {
      id: "ch03-deploy-q10",
      set: "deploy",
      prompt: "What is infrastructure as code?",
      options: [
        "Managing infrastructure through machine-readable definition files instead of manual steps",
        "Writing the application code that will run on virtual machines in the cloud",
        "Storing only the source code of applications in a Git repository",
        "Using a graphical console to click through each deployment by hand",
      ],
      answer: 0,
      explanation:
        "With infrastructure as code, environments are defined in files (such as ARM templates or Bicep) that can be versioned, reviewed, and reused.",
    },
    {
      id: "ch03-deploy-q11",
      set: "deploy",
      prompt: "What happens when you deploy the same ARM template to the same resource group several times?",
      options: [
        "Duplicate copies of every resource are created each time the template is deployed",
        "The deployment fails with an error because the resources already exist",
        "The resource group is deleted and recreated before each deployment runs",
        "Resources end up in the same declared state every time, because deployments are idempotent",
      ],
      answer: 3,
      explanation:
        "Template deployments are idempotent: running one repeatedly produces the same end state rather than duplicates or errors.",
    },
    {
      id: "ch03-deploy-q12",
      set: "deploy",
      prompt: "Which language offers a simpler, more readable syntax than JSON for authoring Azure deployments?",
      options: ["PowerShell", "Bicep", "SQL", "HTML"],
      answer: 1,
      explanation: "Bicep is a declarative language for Azure deployments. It compiles to ARM templates but is easier to read and write.",
    },
    {
      id: "ch03-deploy-q13",
      set: "deploy",
      prompt:
        "Why do the portal, CLI, PowerShell, and templates produce consistent results when they create resources?",
      options: [
        "Each tool contains its own separate copy of Azure",
        "They all deploy only to the same virtual machine",
        "They all send their requests through Azure Resource Manager",
        "They each use a different set of rules for resources",
      ],
      answer: 2,
      explanation:
        "Every management tool calls Azure Resource Manager, which authenticates the request, applies access control, and carries it out the same way.",
    },
    {
      id: "ch03-deploy-q14",
      set: "deploy",
      prompt: "What is the difference between a declarative template and an imperative script?",
      options: [
        "A template describes the desired end state; a script lists the steps to run in order",
        "A template lists the steps to run in order; a script describes the desired end state",
        "A template can only create virtual machines; a script can create anything",
        "There is no difference, because both always behave the same way",
      ],
      answer: 0,
      explanation:
        "Declarative tools (ARM templates, Bicep) say what you want and let Azure work out how. Imperative scripts (CLI, PowerShell) say exactly which commands to run.",
    },
    {
      id: "ch03-deploy-q15",
      set: "deploy",
      prompt:
        "A team wants identical dev, test, and production environments that can be recreated on demand. What should it use?",
      options: [
        "A hand-built setup that is configured in the Azure portal for each environment",
        "A separate subscription that is created for each member of the team",
        "Azure Advisor recommendations that are applied manually to each environment",
        "An ARM template or Bicep file that is kept in source control",
      ],
      answer: 3,
      explanation:
        "A template stored in source control produces the same environment every time and records every change, which manual setup cannot.",
    },

    // ------------------------------------------------ Monitoring tools (15)
    {
      id: "ch03-monitor-q01",
      set: "monitor",
      prompt:
        "Which service analyzes your resource configuration and usage and gives personalized recommendations?",
      options: [
        "Azure Monitor",
        "Azure Advisor",
        "Azure Policy",
        "Microsoft Purview",
      ],
      answer: 1,
      explanation:
        "Azure Advisor reviews how your resources are set up and used, then recommends ways to improve them.",
    },
    {
      id: "ch03-monitor-q02",
      set: "monitor",
      prompt: "Which of these is a category of Azure Advisor recommendations?",
      options: ["Software licensing", "Identity management", "Network routing", "Operational excellence"],
      answer: 3,
      explanation:
        "Advisor groups recommendations into reliability, security, performance, cost, and operational excellence.",
    },
    {
      id: "ch03-monitor-q03",
      set: "monitor",
      prompt:
        "Azure Advisor suggests shrinking an underused virtual machine to save money. Which category is this?",
      options: ["Cost", "Security", "Reliability", "Performance"],
      answer: 0,
      explanation: "Recommendations about reducing spending, such as right-sizing or removing idle resources, fall under cost.",
    },
    {
      id: "ch03-monitor-q04",
      set: "monitor",
      prompt:
        "Which service informs you about Azure service issues and planned maintenance that can affect your resources?",
      options: [
        "Azure Advisor",
        "Microsoft Cost Management",
        "Azure Service Health",
        "Azure Policy",
      ],
      answer: 2,
      explanation:
        "Azure Service Health tracks Azure outages, planned maintenance, and health advisories relevant to you.",
    },
    {
      id: "ch03-monitor-q05",
      set: "monitor",
      prompt:
        "Which part of Azure Service Health shows a global view of the health of Azure services and regions?",
      options: ["Resource health", "Azure status", "Service health", "Activity log"],
      answer: 1,
      explanation:
        "Azure status is the public, global overview. Service health is personalized to your subscriptions, and resource health covers individual resources.",
    },
    {
      id: "ch03-monitor-q06",
      set: "monitor",
      prompt:
        "Which part of Azure Service Health gives a personalized view of issues, planned maintenance, and advisories for the services and regions you use?",
      options: ["Azure status", "Resource health", "Azure Advisor", "Service health"],
      answer: 3,
      explanation:
        "Service health filters Azure-wide events down to the subscriptions, services, and regions that matter to you.",
    },
    {
      id: "ch03-monitor-q07",
      set: "monitor",
      prompt:
        "Which part of Azure Service Health shows the health of an individual resource, such as one virtual machine?",
      options: ["Resource health", "Azure status", "Service health", "Cost analysis"],
      answer: 0,
      explanation:
        "Resource health reports whether a specific resource is available and, if not, whether an Azure platform problem is the cause.",
    },
    {
      id: "ch03-monitor-q08",
      set: "monitor",
      prompt:
        "Which service collects, analyzes, and acts on telemetry from cloud and on-premises environments?",
      options: ["Azure Arc", "Azure Advisor", "Azure Monitor", "Azure Policy"],
      answer: 2,
      explanation:
        "Azure Monitor gathers metrics and logs from your applications and infrastructure so you can analyze them and respond to issues.",
    },
    {
      id: "ch03-monitor-q09",
      set: "monitor",
      prompt:
        "Which Azure Monitor data type is a lightweight numeric value collected at regular intervals, such as CPU percentage?",
      options: ["Logs", "Metrics", "Tags", "Locks"],
      answer: 1,
      explanation:
        "Metrics are numeric time-series values. Logs hold richer, record-style data that you query for detail.",
    },
    {
      id: "ch03-monitor-q10",
      set: "monitor",
      prompt: "Which tool lets you write queries to analyze log data collected by Azure Monitor?",
      options: ["Azure Advisor", "Cost analysis", "Resource health", "Log Analytics"],
      answer: 3,
      explanation:
        "Log Analytics is the tool in the Azure portal for querying log data in a workspace, using the Kusto Query Language (KQL).",
    },
    {
      id: "ch03-monitor-q11",
      set: "monitor",
      prompt: "Which Azure Monitor feature notifies you when a condition, such as high CPU, is met?",
      options: ["Alerts", "Tags", "Budgets", "Locks"],
      answer: 0,
      explanation:
        "Azure Monitor alerts evaluate metrics and logs, and notify you or trigger an action when the condition you define is met.",
    },
    {
      id: "ch03-monitor-q12",
      set: "monitor",
      prompt: "What does an action group define in Azure Monitor?",
      options: [
        "The users who are allowed to read the monitoring data for a subscription",
        "The retention period that applies to the data stored in a log workspace",
        "The notifications and actions to run when an alert fires",
        "The virtual machines that belong to the same availability set",
      ],
      answer: 2,
      explanation:
        "An action group is a reusable set of responses, such as sending an email or SMS, calling a webhook, or running automation, that alerts can trigger.",
    },
    {
      id: "ch03-monitor-q13",
      set: "monitor",
      prompt:
        "Which feature monitors the performance and availability of web applications, tracking requests, exceptions, and dependencies?",
      options: [
        "Azure Service Health",
        "Application Insights",
        "Azure Advisor",
        "Microsoft Cost Management",
      ],
      answer: 1,
      explanation:
        "Application Insights is the application performance monitoring feature of Azure Monitor. It helps you detect slow requests, failures, and dependency problems.",
    },
    {
      id: "ch03-monitor-q14",
      set: "monitor",
      prompt:
        "An administrator wants advance notice of planned maintenance that could affect their virtual machines. Which service should they use?",
      options: [
        "Azure Advisor",
        "Azure Policy",
        "Microsoft Cost Management",
        "Azure Service Health",
      ],
      answer: 3,
      explanation:
        "Azure Service Health sends notices about planned maintenance and can alert you before it affects your resources.",
    },
    {
      id: "ch03-monitor-q15",
      set: "monitor",
      prompt:
        "Which capability lets a team visualize metrics and logs together on a shared, customizable view?",
      options: [
        "Azure dashboards and workbooks",
        "Resource locks",
        "Cost budgets",
        "Azure Policy initiatives",
      ],
      answer: 0,
      explanation:
        "Dashboards and Azure Monitor workbooks combine charts and queries into views you can customize and share with your team.",
    },
  ],
});
