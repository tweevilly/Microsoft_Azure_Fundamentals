/*
 * AZ-900 Chapter 2: Describe Azure architecture and services
 *
 * Four topic sets (see `sets`). Question format is documented in chapter-01.js.
 */
(window.AZ900 = window.AZ900 || { chapters: [] }).chapters.push({
  id: "ch02",
  number: 2,
  title: "Describe Azure architecture and services",
  sets: [
    { id: "core", label: "Core architectural components" },
    { id: "compute", label: "Compute and networking services" },
    { id: "storage", label: "Storage services" },
    { id: "identity", label: "Identity, access, and security" },
    { id: "exam", label: "Exam-style: Yes/No and choose-two" },
  ],
  questions: [
    // ------------------------------------------------ Core architectural components (16)
    {
      id: "ch02-core-q01",
      set: "core",
      prompt: "What is an Azure region?",
      options: [
        "A single physical building that holds servers along with their power, cooling, and networking equipment",
        "A set of datacenters deployed within a latency-defined perimeter and connected by a dedicated low-latency network",
        "A logical container that holds related resources so they can be managed and deleted together",
        "A billing boundary that groups the charges for resources across an organization",
      ],
      answer: 1,
      explanation:
        "A region is a geographic area containing one or more nearby datacenters networked together with a low-latency connection. You choose a region when you deploy most resources.",
    },
    {
      id: "ch02-core-q02",
      set: "core",
      prompt: "What is an availability zone?",
      options: [
        "A group of regions in the same country that share one set of compliance certifications",
        "A logical grouping of subscriptions that is used to apply the same policies across them",
        "A physically separate location within a region with its own power, cooling, and networking",
        "A backup copy of a resource group that is stored in a second Azure region",
      ],
      answer: 2,
      explanation:
        "Availability zones are physically separate locations inside a region. Each has independent power, cooling, and networking, so a problem in one zone does not take down the others.",
    },
    {
      id: "ch02-core-q03",
      set: "core",
      prompt: "In regions that support availability zones, what is the minimum number of separate zones?",
      options: ["Two", "Four", "Five", "Three"],
      answer: 3,
      explanation:
        "Regions that support availability zones have a minimum of three separate zones, so zone-redundant services can survive the loss of one.",
    },
    {
      id: "ch02-core-q04",
      set: "core",
      prompt: "Deploying virtual machines across availability zones primarily protects against which failure?",
      options: [
        "Loss of an entire region caused by a natural disaster",
        "Accidental deletion of a resource group by an administrator",
        "Expiration of a subscription because of a billing problem",
        "A datacenter-level failure such as a power or cooling outage",
      ],
      answer: 3,
      explanation:
        "Zones protect against failures that affect a single datacenter within a region. To survive a whole-region outage you need resources in a second region.",
      hint: "Zones live inside one region.",
    },
    {
      id: "ch02-core-q05",
      set: "core",
      prompt: "What is the purpose of Azure region pairs?",
      options: [
        "To provide geo-redundancy, staged platform updates, and recovery prioritization",
        "To merge the billing of two regions into a single combined invoice",
        "To let two regions share one resource group and a single set of resources",
        "To make resources in both regions cheaper through a combined volume discount",
      ],
      answer: 0,
      explanation:
        "Each region is paired with another in the same geography. Planned updates roll out to one region of a pair at a time, and during a broad outage one region of each pair is prioritized for recovery.",
    },
    {
      id: "ch02-core-q06",
      set: "core",
      prompt: "Which of the following is an example of an Azure sovereign region?",
      options: ["West US", "Azure Government (US)", "North Europe", "Southeast Asia"],
      answer: 1,
      explanation:
        "Sovereign regions are isolated instances of Azure built for compliance or legal needs. Azure Government (US) and Azure operated by 21Vianet (China) are the examples.",
    },
    {
      id: "ch02-core-q07",
      set: "core",
      prompt: "What is an Azure resource group?",
      options: [
        "A physical rack of servers that Azure assigns to a single customer",
        "A role that grants a user permission to manage a set of resources",
        "A logical container where related Azure resources are deployed and managed",
        "A copy of a subscription that is used for testing and development",
      ],
      answer: 2,
      explanation:
        "A resource group is a logical container for resources that share a lifecycle, such as everything for one application. You can manage, tag, and delete them together.",
    },
    {
      id: "ch02-core-q08",
      set: "core",
      prompt: "Which statement about resource groups is true?",
      options: [
        "Deleting a resource group deletes all the resources inside it",
        "A resource can belong to several resource groups at once",
        "A resource group can only hold resources from a single region",
        "Resource groups can be nested inside other resource groups",
      ],
      answer: 0,
      explanation:
        "Deleting a resource group deletes everything in it. A resource belongs to exactly one resource group, a group can hold resources from different regions, and groups cannot be nested.",
    },
    {
      id: "ch02-core-q09",
      set: "core",
      prompt: "What is an Azure subscription?",
      options: [
        "A logical unit that provides authorized access to Azure services and acts as a billing boundary",
        "A physical allocation of servers that is reserved for one customer in a single datacenter location",
        "A group of regions that are purchased together at a fixed monthly price for each customer",
        "A type of virtual machine image that is used to create new servers from a saved template",
      ],
      answer: 0,
      explanation:
        "A subscription is the unit of access and billing. Every resource lives in a subscription, and usage is billed to it.",
    },
    {
      id: "ch02-core-q10",
      set: "core",
      prompt: "Which is a common reason to create multiple Azure subscriptions?",
      options: [
        "To gain access to additional Azure regions that are not available in one subscription",
        "To increase the number of availability zones available to your virtual machines",
        "To separate billing and access for environments or departments, such as dev and production",
        "To avoid having to use resource groups when organizing the resources for an application",
      ],
      answer: 2,
      explanation:
        "Separate subscriptions let you split costs and apply different access and policies to environments, departments, or projects.",
    },
    {
      id: "ch02-core-q11",
      set: "core",
      prompt: "What are Azure management groups used for?",
      options: [
        "Load balancing incoming traffic across a set of virtual machines that run in one region",
        "Grouping users together so that they can be prompted for multifactor authentication",
        "Storing the diagnostic logs from all of the resources that are deployed in several regions",
        "Organizing subscriptions so governance, such as policy and access, can be applied across them",
      ],
      answer: 3,
      explanation:
        "Management groups sit above subscriptions, letting you apply policies and role assignments across many subscriptions together.",
    },
    {
      id: "ch02-core-q12",
      set: "core",
      prompt: "Which is the correct hierarchy, from the broadest scope down to the narrowest?",
      options: [
        "Subscription, management group, resource group, resource",
        "Management group, subscription, resource group, resource",
        "Resource group, subscription, management group, resource",
        "Resource, resource group, subscription, management group",
      ],
      answer: 1,
      explanation:
        "Management groups contain subscriptions, subscriptions contain resource groups, and resource groups contain resources.",
    },
    {
      id: "ch02-core-q13",
      set: "core",
      prompt:
        "Which service is the deployment and management layer that the Azure portal, CLI, PowerShell, and REST APIs use to create, update, and delete resources?",
      options: [
        "Azure Resource Manager",
        "Azure Monitor",
        "Azure Advisor",
        "Azure Service Health",
      ],
      answer: 0,
      explanation:
        "Azure Resource Manager (ARM) receives requests from every management tool and applies them consistently, including authentication, access control, and template deployments.",
    },
    {
      id: "ch02-core-q14",
      set: "core",
      prompt:
        "A company needs its web app to stay online even if an entire Azure region fails. What should it do?",
      options: [
        "Deploy the app to availability zones in only one region",
        "Use a single large VM with premium disks",
        "Deploy the app to two regions, ideally a region pair",
        "Add more subscriptions",
      ],
      answer: 2,
      explanation:
        "Availability zones protect within a region. Surviving a regional outage requires deploying to a second region, and a region pair is the natural choice.",
    },
    {
      id: "ch02-core-q15",
      set: "core",
      prompt: "A policy is assigned at a management group. What happens to the subscriptions beneath it?",
      options: [
        "They inherit the policy",
        "They ignore it unless it is assigned again",
        "Only newly created subscriptions inherit it",
        "Only resource groups inherit it, not subscriptions",
      ],
      answer: 0,
      explanation:
        "Policies and role assignments are inherited downward through management groups, subscriptions, resource groups, and resources.",
    },
    {
      id: "ch02-core-q16",
      set: "core",
      prompt: "A company wants to reduce latency for customers in Japan. What is the best first step?",
      options: [
        "Create more subscriptions so that each country has its own billing account",
        "Deploy the resources to an Azure region geographically close to those customers",
        "Use a larger virtual machine size so that each request is processed faster",
        "Place the resources in a management group that is dedicated to Japan",
      ],
      answer: 1,
      explanation:
        "Latency depends largely on distance, so choosing a region near your users is the most direct way to reduce it.",
    },

    // ------------------------------------------------ Compute and networking (18)
    {
      id: "ch02-compute-q01",
      set: "compute",
      prompt: "Which statement describes Azure Virtual Machines?",
      options: [
        "A managed platform for hosting web apps and APIs without having to manage any servers",
        "Virtualized servers (IaaS) where you manage the operating system and the software you install",
        "A serverless service where code runs in response to events and is billed per execution",
        "A hosted software application for email, calendar, and collaboration that users subscribe to",
      ],
      answer: 1,
      explanation:
        "Virtual machines are IaaS. You choose the OS, install software, and are responsible for patching and configuring it.",
    },
    {
      id: "ch02-compute-q02",
      set: "compute",
      prompt:
        "Which service lets you create and manage a group of identical, load-balanced VMs that can scale in or out automatically?",
      options: [
        "Availability sets",
        "Resource groups",
        "Virtual machine scale sets",
        "Management groups",
      ],
      answer: 2,
      explanation:
        "Virtual machine scale sets deploy identical VMs and add or remove instances based on demand or a schedule.",
    },
    {
      id: "ch02-compute-q03",
      set: "compute",
      prompt:
        "What do availability sets protect against by placing VMs in multiple fault domains and update domains?",
      options: [
        "Hardware failures or planned maintenance taking down all your VMs at once within a datacenter",
        "An outage of an entire Azure region that takes every datacenter in it offline",
        "Accidental deletion of a VM by an administrator who has been granted the wrong permissions",
        "Unauthorized sign-in attempts against the virtual machines coming from the public internet",
      ],
      answer: 0,
      explanation:
        "Spreading VMs across fault and update domains means a single hardware fault or maintenance event does not affect every VM. It does not protect against a whole-region outage.",
    },
    {
      id: "ch02-compute-q04",
      set: "compute",
      prompt: "In an availability set, what is a fault domain?",
      options: [
        "A group of VMs that Azure may reboot at the same time during maintenance",
        "A DNS zone that resolves VM names",
        "A subnet that isolates VM traffic",
        "A group of VMs that share a common power source and network switch",
      ],
      answer: 3,
      explanation:
        "A fault domain is a set of hardware sharing power and networking. An update domain is the group that can be rebooted together during maintenance.",
    },
    {
      id: "ch02-compute-q05",
      set: "compute",
      prompt:
        "Which Azure service provides desktop and application virtualization, letting users reach cloud-hosted Windows desktops from many devices?",
      options: [
        "Azure Bastion",
        "Azure Virtual Desktop",
        "Azure App Service",
        "Azure Functions",
      ],
      answer: 1,
      explanation:
        "Azure Virtual Desktop delivers virtualized Windows desktops and apps from the cloud to users on a wide range of devices.",
    },
    {
      id: "ch02-compute-q06",
      set: "compute",
      prompt:
        "Which service lets you run a container in Azure without managing virtual machines or an orchestrator?",
      options: [
        "Azure Kubernetes Service",
        "Azure Virtual Network",
        "Azure Container Instances",
        "Azure Files",
      ],
      answer: 2,
      explanation:
        "Azure Container Instances is the fastest way to run a container: no VMs to manage and no orchestrator to set up.",
    },
    {
      id: "ch02-compute-q07",
      set: "compute",
      prompt:
        "Which service is a managed Kubernetes offering for deploying, scaling, and operating containerized applications?",
      options: [
        "Azure Kubernetes Service (AKS)",
        "Azure Container Instances",
        "Azure Functions",
        "Virtual machine scale sets",
      ],
      answer: 0,
      explanation:
        "AKS manages the Kubernetes control plane for you, so you focus on the containers and nodes that run your workloads.",
    },
    {
      id: "ch02-compute-q08",
      set: "compute",
      prompt:
        "Which PaaS service hosts web apps, REST APIs, and mobile backends without you managing the underlying servers?",
      options: [
        "Azure Virtual Machines",
        "Azure DNS",
        "Azure VPN Gateway",
        "Azure App Service",
      ],
      answer: 3,
      explanation:
        "App Service is a fully managed platform for web apps and APIs, with built-in scaling and support for several languages.",
    },
    {
      id: "ch02-compute-q09",
      set: "compute",
      prompt: "Which service runs small pieces of event-triggered code and bills per execution?",
      options: [
        "Azure App Service",
        "Azure Functions",
        "Azure Virtual Desktop",
        "Azure Container Instances",
      ],
      answer: 1,
      explanation:
        "Azure Functions is serverless: code runs in response to triggers such as HTTP requests or queue messages, and you pay for what executes.",
    },
    {
      id: "ch02-compute-q10",
      set: "compute",
      prompt:
        "An app needs a specific operating system configuration and custom software installed on the OS. Which compute option gives the most control?",
      options: [
        "Azure Functions",
        "Azure App Service",
        "Azure Virtual Machines",
        "Azure DNS",
      ],
      answer: 2,
      explanation:
        "Only virtual machines give you control of the operating system itself. App Service and Functions abstract the OS away.",
    },
    {
      id: "ch02-compute-q11",
      set: "compute",
      prompt: "What is an Azure virtual network (VNet)?",
      options: [
        "A private network in Azure that lets resources communicate securely with each other, the internet, and on-premises",
        "A physical network connection that Microsoft installs between its datacenters to link regions together",
        "A service that hosts DNS records and answers name-resolution queries for your domains",
        "A group of identical virtual machines that are scaled in and out automatically with load",
      ],
      answer: 0,
      explanation:
        "A VNet is your own isolated network in Azure. It is the basic building block for private communication between Azure resources.",
    },
    {
      id: "ch02-compute-q12",
      set: "compute",
      prompt: "Why would you divide a virtual network into subnets?",
      options: [
        "To add more regions to the network so that it can span several geographies",
        "To make the network publicly reachable from anywhere on the internet",
        "To change the subscription that the network belongs to without moving it",
        "To segment and organize resources so you can control traffic and apply security rules",
      ],
      answer: 3,
      explanation:
        "Subnets split a VNet's address space into smaller segments, such as web and database tiers, so you can apply different routing and security rules to each.",
    },
    {
      id: "ch02-compute-q13",
      set: "compute",
      prompt: "What does virtual network peering do?",
      options: [
        "Encrypts all of the traffic that flows between a virtual network and the public internet by default",
        "Connects two virtual networks so resources communicate over private IP addresses on the Microsoft backbone",
        "Copies a virtual network, with all of its subnets, to a different subscription",
        "Assigns public IP addresses to the virtual machines so they are reachable externally",
      ],
      answer: 1,
      explanation:
        "Peering links VNets so they behave as one network for connectivity, with traffic staying on Microsoft's private backbone rather than the public internet.",
    },
    {
      id: "ch02-compute-q14",
      set: "compute",
      prompt:
        "Which service sends encrypted traffic between an Azure virtual network and an on-premises network over the public internet?",
      options: [
        "Azure ExpressRoute",
        "Azure DNS",
        "Azure VPN Gateway",
        "Virtual network peering",
      ],
      answer: 2,
      explanation:
        "VPN Gateway creates an encrypted tunnel across the public internet. ExpressRoute, by contrast, uses a private connection.",
    },
    {
      id: "ch02-compute-q15",
      set: "compute",
      prompt:
        "Which service provides a private, dedicated connection from on-premises to Azure that does NOT travel over the public internet?",
      options: [
        "Azure ExpressRoute",
        "Azure VPN Gateway",
        "Azure DNS",
        "Azure Bastion",
      ],
      answer: 0,
      explanation:
        "ExpressRoute uses a private connection through a connectivity provider, typically offering more reliability and consistent latency than internet-based VPNs.",
      hint: "Compare it with the VPN option, which does use the internet.",
    },
    {
      id: "ch02-compute-q16",
      set: "compute",
      prompt: "Which service hosts DNS domains and provides name resolution using Azure infrastructure?",
      options: [
        "Azure VPN Gateway",
        "Azure Load Balancer",
        "Azure Virtual Desktop",
        "Azure DNS",
      ],
      answer: 3,
      explanation:
        "Azure DNS hosts your DNS zones and answers queries from Microsoft's global network of name servers.",
    },
    {
      id: "ch02-compute-q17",
      set: "compute",
      prompt: "How does a private endpoint differ from a public endpoint?",
      options: [
        "A private endpoint is reachable from any device on the internet that knows the name of the service",
        "A private endpoint uses a private IP address in your VNet, so traffic stays off the public internet",
        "A private endpoint is available only for virtual machines and not for storage accounts or databases",
        "A private endpoint requires an ExpressRoute circuit before it can be created",
      ],
      answer: 1,
      explanation:
        "A public endpoint is reached over the internet. A private endpoint (Azure Private Link) brings the service into your VNet with a private IP, keeping traffic off the public internet.",
    },
    {
      id: "ch02-compute-q18",
      set: "compute",
      prompt:
        "Which resource filters inbound and outbound network traffic to Azure resources using allow and deny rules?",
      options: [
        "Availability set",
        "Azure DNS",
        "Network security group",
        "Resource lock",
      ],
      answer: 2,
      explanation:
        "A network security group contains rules that allow or deny traffic based on source, destination, port, and protocol, and can be applied to subnets or network interfaces.",
    },

    // ------------------------------------------------ Storage services (18)
    {
      id: "ch02-storage-q01",
      set: "storage",
      prompt: "What is an Azure storage account?",
      options: [
        "A user account that an administrator uses to sign in to the Azure portal",
        "A virtual machine whose attached disks are used to store the files for your applications",
        "A resource that provides a unique namespace for your Azure Storage data, reachable over HTTPS",
        "A subscription that is used to track and bill only the storage costs of a whole company",
      ],
      answer: 2,
      explanation:
        "A storage account holds your storage data objects (blobs, files, queues, tables) under a unique namespace, and is where you choose settings like redundancy.",
    },
    {
      id: "ch02-storage-q02",
      set: "storage",
      prompt:
        "Which storage service is optimized for huge amounts of unstructured data such as images, video, and backups?",
      options: [
        "Azure Blob Storage",
        "Azure Queue Storage",
        "Azure Table Storage",
        "Azure Disk Storage",
      ],
      answer: 0,
      explanation: "Blob Storage stores unstructured objects at massive scale and is the usual home for media, documents, and backups.",
    },
    {
      id: "ch02-storage-q03",
      set: "storage",
      prompt: "Which service offers fully managed file shares that can be mounted using SMB or NFS?",
      options: [
        "Azure Blob Storage",
        "Azure Queue Storage",
        "Azure Table Storage",
        "Azure Files",
      ],
      answer: 3,
      explanation: "Azure Files provides file shares in the cloud that work like a traditional network file share and can be mounted by many machines at once.",
    },
    {
      id: "ch02-storage-q04",
      set: "storage",
      prompt:
        "Which service stores large numbers of messages that application components can read asynchronously?",
      options: [
        "Azure Files",
        "Azure Queue Storage",
        "Azure Table Storage",
        "Azure Blob Storage",
      ],
      answer: 1,
      explanation: "Queue Storage holds messages so one part of an application can hand work to another without the two running at the same time.",
    },
    {
      id: "ch02-storage-q05",
      set: "storage",
      prompt: "Which service stores structured, non-relational (NoSQL) key and attribute data?",
      options: [
        "Azure Queue Storage",
        "Azure Files",
        "Azure Table Storage",
        "Azure Blob Storage",
      ],
      answer: 2,
      explanation: "Table Storage is a NoSQL key-attribute store for structured data that does not need a fixed schema.",
    },
    {
      id: "ch02-storage-q06",
      set: "storage",
      prompt:
        "Which storage offering provides block-level volumes that virtual machines use as OS and data disks?",
      options: [
        "Azure managed disks",
        "Azure Files",
        "Azure Queue Storage",
        "Azure Table Storage",
      ],
      answer: 0,
      explanation: "Managed disks are block storage volumes for VMs. Azure handles the underlying storage accounts for you.",
    },
    {
      id: "ch02-storage-q07",
      set: "storage",
      prompt:
        "Which redundancy option keeps three copies of your data within a single physical location in the primary region?",
      options: [
        "Zone-redundant storage (ZRS)",
        "Geo-redundant storage (GRS)",
        "Geo-zone-redundant storage (GZRS)",
        "Locally redundant storage (LRS)",
      ],
      answer: 3,
      explanation:
        "LRS is the lowest-cost option. It protects against drive and rack failures but not against loss of the whole datacenter.",
    },
    {
      id: "ch02-storage-q08",
      set: "storage",
      prompt:
        "Which redundancy option copies data synchronously across three availability zones in the primary region?",
      options: [
        "Locally redundant storage (LRS)",
        "Zone-redundant storage (ZRS)",
        "Geo-redundant storage (GRS)",
        "Archive access tier",
      ],
      answer: 1,
      explanation:
        "ZRS spreads copies across three zones, so the data stays available if one zone fails.",
    },
    {
      id: "ch02-storage-q09",
      set: "storage",
      prompt:
        "Which redundancy option also copies your data to a secondary region far from the primary region?",
      options: [
        "Locally redundant storage (LRS)",
        "Zone-redundant storage (ZRS)",
        "Geo-redundant storage (GRS)",
        "Cool access tier",
      ],
      answer: 2,
      explanation:
        "GRS keeps local copies in the primary region and replicates to a secondary region. Read-access GRS (RA-GRS) additionally lets you read from the secondary.",
    },
    {
      id: "ch02-storage-q10",
      set: "storage",
      prompt:
        "Which option combines zone redundancy in the primary region with replication to a secondary region?",
      options: [
        "Geo-zone-redundant storage (GZRS)",
        "Locally redundant storage (LRS)",
        "Zone-redundant storage (ZRS)",
        "Geo-redundant storage (GRS)",
      ],
      answer: 0,
      explanation:
        "GZRS uses ZRS in the primary region and copies to a single location in the secondary region, giving the broadest protection of the standard options.",
    },
    {
      id: "ch02-storage-q11",
      set: "storage",
      prompt:
        "A company needs its data to survive a complete regional outage. What is the minimum redundancy type that meets this?",
      options: [
        "Locally redundant storage (LRS)",
        "Zone-redundant storage (ZRS)",
        "Azure Files",
        "Geo-redundant storage (GRS)",
      ],
      answer: 3,
      explanation:
        "LRS and ZRS keep data within one region. Only geo-redundant options (GRS, GZRS, and their read-access versions) replicate to another region.",
    },
    {
      id: "ch02-storage-q12",
      set: "storage",
      prompt:
        "Which access tier has the highest storage cost but the lowest access cost, and suits frequently accessed data?",
      options: ["Archive", "Hot", "Cool", "Cold"],
      answer: 1,
      explanation:
        "The hot tier is for data in active use. Cooler tiers trade lower storage prices for higher access costs.",
    },
    {
      id: "ch02-storage-q13",
      set: "storage",
      prompt:
        "Data is rarely accessed but must stay available online and be kept for at least 30 days. Which access tier is intended for it?",
      options: ["Hot", "Archive", "Cool", "Premium"],
      answer: 2,
      explanation:
        "The cool tier is for infrequently accessed data kept at least 30 days. The cold tier goes further (90 days) and archive further still (180 days).",
    },
    {
      id: "ch02-storage-q14",
      set: "storage",
      prompt:
        "Which access tier has the lowest storage cost but keeps data offline, so it must be rehydrated before it can be read?",
      options: ["Archive", "Cold", "Cool", "Hot"],
      answer: 0,
      explanation:
        "Archive is for rarely needed data you can wait hours to retrieve. Moving a blob out of archive is called rehydration.",
    },
    {
      id: "ch02-storage-q15",
      set: "storage",
      prompt: "Which command-line utility copies blobs or files to and from a storage account?",
      options: [
        "Azure Migrate",
        "Azure Data Box",
        "Azure File Sync",
        "AzCopy",
      ],
      answer: 3,
      explanation:
        "AzCopy is a command-line tool for uploading, downloading, and copying data to and from Azure Storage.",
    },
    {
      id: "ch02-storage-q16",
      set: "storage",
      prompt: "Which service syncs on-premises Windows file servers with Azure Files shares?",
      options: [
        "AzCopy",
        "Azure File Sync",
        "Azure Data Box",
        "Azure Queue Storage",
      ],
      answer: 1,
      explanation:
        "Azure File Sync keeps a local Windows server cache in step with an Azure Files share, so you can centralize file storage in Azure while keeping local access.",
    },
    {
      id: "ch02-storage-q17",
      set: "storage",
      prompt:
        "A company must move tens of terabytes of data to Azure, but its network is too slow. Which service ships a physical device to move the data?",
      options: [
        "Azure File Sync",
        "AzCopy",
        "Azure Data Box",
        "Azure DNS",
      ],
      answer: 2,
      explanation:
        "Azure Data Box is a physical appliance you load with data and ship to Microsoft, which uploads it for you. It suits large offline transfers.",
    },
    {
      id: "ch02-storage-q18",
      set: "storage",
      prompt:
        "Which service helps discover, assess, and migrate on-premises servers, databases, and web apps to Azure?",
      options: [
        "Azure Migrate",
        "Azure Advisor",
        "Azure Monitor",
        "Azure Files",
      ],
      answer: 0,
      explanation:
        "Azure Migrate is the central hub for assessing and migrating on-premises workloads to Azure.",
    },

    // ------------------------------------------------ Identity, access, and security (18)
    {
      id: "ch02-identity-q01",
      set: "identity",
      prompt: "What is Microsoft Entra ID (formerly Azure Active Directory)?",
      options: [
        "A service that hosts virtual machines and the apps that run on them",
        "A cloud-based identity and access management service that handles sign-in",
        "A physical firewall appliance that filters traffic at the network edge",
        "A storage redundancy option that copies data to a second region",
      ],
      answer: 1,
      explanation:
        "Microsoft Entra ID is Microsoft's cloud identity and access management service. It handles sign-in and access to Azure, Microsoft 365, and many other apps.",
    },
    {
      id: "ch02-identity-q02",
      set: "identity",
      prompt: "What is the difference between authentication and authorization?",
      options: [
        "Authentication decides what a user can do; authorization proves who the user is",
        "They mean the same thing, and the two terms are used interchangeably",
        "Authentication applies only to apps; authorization applies only to users",
        "Authentication verifies who you are; authorization determines what you are allowed to access",
      ],
      answer: 3,
      explanation:
        "Authentication proves identity (for example, with a password and MFA). Authorization then decides which resources that identity may use.",
    },
    {
      id: "ch02-identity-q03",
      set: "identity",
      prompt:
        "Which service provides managed domain services such as domain join, group policy, and LDAP without deploying your own domain controllers?",
      options: [
        "Microsoft Entra Domain Services",
        "Azure DNS",
        "Azure Bastion",
        "Azure VPN Gateway",
      ],
      answer: 0,
      explanation:
        "Microsoft Entra Domain Services provides a managed domain, so legacy apps that need domain join, Kerberos, or LDAP can run in Azure without self-managed domain controllers.",
    },
    {
      id: "ch02-identity-q04",
      set: "identity",
      prompt: "What does single sign-on (SSO) allow?",
      options: [
        "Using the same password for every website and application on the internet",
        "Skipping the authentication step for administrator accounts entirely",
        "Signing in once with one identity to access multiple applications",
        "Signing in from only one device",
      ],
      answer: 2,
      explanation:
        "With SSO a user signs in once and then reaches multiple apps and resources without entering credentials again for each.",
    },
    {
      id: "ch02-identity-q05",
      set: "identity",
      prompt: "What does multifactor authentication (MFA) require?",
      options: [
        "A longer password that contains more symbols, numbers, and uppercase letters",
        "Two or more verification methods from different categories, such as a password and a phone",
        "Signing in only from a network that the organization has marked as trusted",
        "An administrator to approve every sign-in before the user is let in",
      ],
      answer: 1,
      explanation:
        "MFA combines at least two kinds of proof, such as something you know, something you have, or something you are, so a stolen password alone is not enough.",
    },
    {
      id: "ch02-identity-q06",
      set: "identity",
      prompt: "Which is an example of \"something you have\" in multifactor authentication?",
      options: [
        "A password that you chose when you created the account",
        "A PIN that you memorize and type in at the sign-in prompt",
        "A fingerprint that is scanned by the reader on your device",
        "A hardware security key or a phone running an authenticator app",
      ],
      answer: 3,
      explanation:
        "Passwords and PINs are something you know, and fingerprints are something you are. A physical key or enrolled phone is something you have.",
    },
    {
      id: "ch02-identity-q07",
      set: "identity",
      prompt: "Which is a passwordless authentication method supported by Microsoft Entra ID?",
      options: [
        "A FIDO2 security key",
        "Security questions",
        "A password hint",
        "A shared account password",
      ],
      answer: 0,
      explanation:
        "Passwordless options include Windows Hello for Business, the Microsoft Authenticator app, and FIDO2 security keys.",
    },
    {
      id: "ch02-identity-q08",
      set: "identity",
      prompt: "What does Conditional Access do?",
      options: [
        "Encrypts the data that is stored in your storage accounts using keys you control",
        "Assigns the billing charges for each subscription to the correct department or cost center",
        "Evaluates sign-in signals like user, location, and device, then requires MFA or blocks access",
        "Backs up your virtual machines to a recovery vault on a schedule that you define in a policy",
      ],
      answer: 2,
      explanation:
        "Conditional Access policies work like if-then rules: if a sign-in meets certain conditions, then require MFA, require a compliant device, or block access.",
    },
    {
      id: "ch02-identity-q09",
      set: "identity",
      prompt:
        "A company wants users to complete MFA only when they sign in from outside the corporate network. Which feature should it use?",
      options: [
        "Azure Policy",
        "Conditional Access",
        "Resource locks",
        "Availability zones",
      ],
      answer: 1,
      explanation:
        "Conditional Access can use sign-in location as a signal and require MFA only when the condition (outside the corporate network) is met.",
    },
    {
      id: "ch02-identity-q10",
      set: "identity",
      prompt: "What is Azure role-based access control (Azure RBAC)?",
      options: [
        "A way to encrypt data at rest in storage accounts and databases",
        "A pricing model that discounts subscriptions with long-term commitments",
        "A tool that moves on-premises data into Azure over a private connection",
        "A system for managing access to Azure resources by assigning roles at a scope",
      ],
      answer: 3,
      explanation:
        "Azure RBAC grants access by assigning a role (a set of permissions) to a user, group, or application at a particular scope.",
    },
    {
      id: "ch02-identity-q11",
      set: "identity",
      prompt: "Which built-in role can create and manage all resources but cannot grant access to others?",
      options: ["Contributor", "Owner", "Reader", "Billing Reader"],
      answer: 0,
      explanation:
        "Owner has full access including granting access. Contributor can manage resources but cannot assign roles. Reader can only view.",
      hint: "Owner is the role that can also grant access.",
    },
    {
      id: "ch02-identity-q12",
      set: "identity",
      prompt: "At which levels can an Azure RBAC role be assigned?",
      options: [
        "Only at the individual resource level, never at a broader scope",
        "Only at the subscription level, because roles cannot be inherited",
        "Management group, subscription, resource group, or individual resource",
        "Only at the region level, because roles follow where resources are deployed",
      ],
      answer: 2,
      explanation:
        "A role can be assigned at any scope in the hierarchy and is inherited by everything beneath it.",
    },
    {
      id: "ch02-identity-q13",
      set: "identity",
      prompt:
        "Which feature lets users from partner organizations access your resources using their own identities?",
      options: [
        "Microsoft Entra Domain Services",
        "Microsoft Entra External ID (B2B collaboration)",
        "Azure role-based access control (Azure RBAC)",
        "Virtual network peering between organizations",
      ],
      answer: 1,
      explanation:
        "B2B collaboration invites external users as guests so they can use your apps and resources while signing in with their own organization's identity.",
    },
    {
      id: "ch02-identity-q14",
      set: "identity",
      prompt: "Which set of principles matches the Zero Trust model?",
      options: [
        "Trust everything inside the network and verify only what is outside",
        "Trust devices on the corporate network and verify only users",
        "Block all access by default and never grant any",
        "Verify explicitly, use least privilege access, and assume breach",
      ],
      answer: 3,
      explanation:
        "Zero Trust treats every request as untrusted until verified: verify explicitly, limit access to the minimum needed, and design as if an attacker is already inside.",
    },
    {
      id: "ch02-identity-q15",
      set: "identity",
      prompt: "In a Zero Trust approach, what does \"use least privilege access\" mean?",
      options: [
        "Give users only the access they need, for only as long as they need it",
        "Give every user administrator rights so that nobody is delayed by missing access",
        "Trust any user who signs in from a device on the corporate network",
        "Turn off multifactor authentication for users that the company trusts",
      ],
      answer: 0,
      explanation:
        "Least privilege limits the damage from a compromised account by restricting each identity to the minimum access necessary.",
    },
    {
      id: "ch02-identity-q16",
      set: "identity",
      prompt: "What is defense in depth?",
      options: [
        "Relying on one very strong firewall at the edge of the network to stop attacks",
        "Storing copies of data in multiple regions so that it survives a disaster",
        "A layered security strategy, so a breach of one layer is still blocked by the others",
        "Using only passwordless sign-in methods for every user and administrator",
      ],
      answer: 2,
      explanation:
        "Defense in depth uses multiple layers of protection, so an attacker who gets past one layer still faces the rest.",
    },
    {
      id: "ch02-identity-q17",
      set: "identity",
      prompt: "In the defense in depth model, which layer sits at the center, protected by all the others?",
      options: ["Perimeter", "Data", "Physical security", "Network"],
      answer: 1,
      explanation:
        "From the outside in, the layers are physical security, identity and access, perimeter, network, compute, application, and data. Data is the innermost layer.",
    },
    {
      id: "ch02-identity-q18",
      set: "identity",
      prompt:
        "Which service provides unified security management, threat protection, and a secure score across Azure, on-premises, and multicloud workloads?",
      options: [
        "Azure Advisor",
        "Azure Monitor",
        "Microsoft Entra ID",
        "Microsoft Defender for Cloud",
      ],
      answer: 3,
      explanation:
        "Microsoft Defender for Cloud assesses your security posture (shown as a secure score) and protects workloads across Azure, on-premises, and other clouds.",
    },
    // ---------------------------------------------------------------- Exam-style (Yes/No and choose-two)
    {
      id: "ch02-ex-q01",
      set: "exam",
      type: "yesno",
      prompt: "A company deploys an Azure virtual machine.",
      statements: [
        {
          text: "The virtual machine must be connected to at least one network interface (NIC).",
          answer: true,
          why: "A virtual machine is reachable only through a network interface, so at least one is required.",
        },
        {
          text: "The virtual machine must have a public IP address.",
          answer: false,
          why: "A public IP address is optional. A VM can use only a private IP address inside its virtual network.",
        },
        {
          text: "Deleting the virtual machine automatically deletes the virtual network it was connected to.",
          answer: false,
          why: "The virtual network is a separate resource and remains after the VM is deleted.",
        },
        {
          text: "Every virtual machine has an operating system disk.",
          answer: true,
          why: "The OS disk holds the operating system image, so every VM has one.",
        },
      ],
      explanation: "A VM always needs compute, an OS disk, and a network interface. Public IP addresses and NSGs are optional.",
    },
    {
      id: "ch02-ex-q02",
      set: "exam",
      type: "yesno",
      prompt: "A solutions architect is reviewing how Azure regions are organized.",
      statements: [
        {
          text: "Azure rolls out planned platform updates to only one region in a region pair at a time.",
          answer: true,
          why: "Sequential updates reduce the chance that both regions in a pair are affected at once.",
        },
        {
          text: "Every Azure region supports availability zones.",
          answer: false,
          why: "Only some regions support availability zones. In regions that do, there are at least three zones.",
        },
        {
          text: "Azure Government is an example of a sovereign region.",
          answer: true,
          why: "Sovereign regions such as Azure Government are isolated instances of Azure for specific compliance or legal needs.",
        },
      ],
      explanation:
        "Region pairs have coordinated updates, availability zones exist only in some regions, and sovereign regions are isolated instances of Azure.",
    },
    {
      id: "ch02-ex-q03",
      set: "exam",
      type: "yesno",
      prompt: "An administrator is organizing Azure resources.",
      statements: [
        {
          text: "A resource can belong to only one resource group at a time.",
          answer: true,
          why: "Each resource lives in exactly one resource group, though it can be moved to another.",
        },
        {
          text: "Deleting a resource group deletes all of the resources in it.",
          answer: true,
          why: "A resource group is a lifecycle container. Deleting it removes everything inside.",
        },
        {
          text: "All resources in a resource group must be in the same Azure region.",
          answer: false,
          why: "The resource group has its own location for metadata, but its resources can be in different regions.",
        },
        {
          text: "A subscription can belong to more than one management group at the same time.",
          answer: false,
          why: "The hierarchy is a tree. A subscription has only one parent management group.",
        },
      ],
      explanation: "Resources have one resource group, and subscriptions have one parent management group.",
    },
    {
      id: "ch02-ex-q04",
      set: "exam",
      type: "yesno",
      prompt: "You are creating an Azure storage account.",
      statements: [
        {
          text: "A general-purpose v2 storage account can hold blobs, files, queues, and tables.",
          answer: true,
          why: "A general-purpose v2 account supports all four of the core Azure Storage services.",
        },
        {
          text: "The storage account name must be unique across all of Azure.",
          answer: true,
          why: "The name forms part of the public endpoint URL, so it must be globally unique.",
        },
        {
          text: "The storage account name can contain uppercase letters and hyphens.",
          answer: false,
          why: "Names must be 3 to 24 characters long and use only lowercase letters and numbers.",
        },
      ],
      explanation: "Account names are globally unique, 3 to 24 characters, lowercase letters and numbers only.",
    },
    {
      id: "ch02-ex-q05",
      set: "exam",
      type: "yesno",
      prompt: "A company stores data in Azure Blob Storage and is choosing access tiers.",
      statements: [
        {
          text: "The cool tier is intended for data that is accessed infrequently and stored for at least 30 days.",
          answer: true,
          why: "Cool trades lower storage cost for higher access cost and a 30-day minimum.",
        },
        {
          text: "Data in the archive tier can be read immediately without any extra steps.",
          answer: false,
          why: "Archive data is offline. You must rehydrate it to a hot or cool tier first, which can take hours.",
        },
        {
          text: "The hot tier has higher storage costs and lower access costs than the cool tier.",
          answer: true,
          why: "Hot is optimized for frequent access, so storage costs more but access costs less.",
        },
        {
          text: "The archive tier can be set as the default access tier for a storage account.",
          answer: false,
          why: "Archive can be set only on individual blobs. The account default is hot or cool.",
        },
      ],
      explanation: "Hot is for frequent access, cool for infrequent, and archive for rarely accessed data that can wait hours to be restored.",
    },
    {
      id: "ch02-ex-q06",
      set: "exam",
      type: "yesno",
      prompt: "An architect is comparing Azure Storage redundancy options.",
      statements: [
        {
          text: "Locally redundant storage (LRS) keeps three copies of the data within a single datacenter in the primary region.",
          answer: true,
          why: "LRS is the lowest-cost option. It protects against drive and rack failures but not a datacenter-wide failure.",
        },
        {
          text: "Zone-redundant storage (ZRS) replicates data across three availability zones in the primary region.",
          answer: true,
          why: "ZRS keeps the data available if one zone fails.",
        },
        {
          text: "With geo-redundant storage (GRS), applications can read from the secondary region at any time without a failover.",
          answer: false,
          why: "Read access to the secondary requires RA-GRS or RA-GZRS. With plain GRS the secondary is used only after a failover.",
        },
        {
          text: "Geo-zone-redundant storage (GZRS) uses ZRS in the primary region and copies data to a secondary region.",
          answer: true,
          why: "GZRS combines zone redundancy in the primary region with geo-replication to a secondary region.",
        },
      ],
      explanation: "LRS is one datacenter, ZRS is three zones, GRS adds a secondary region, and GZRS combines ZRS with a secondary region.",
    },
    {
      id: "ch02-ex-q07",
      set: "exam",
      type: "yesno",
      prompt: "Adatum needs to move files to Azure and keep some of them synchronized with on-premises servers.",
      statements: [
        {
          text: "AzCopy is a command-line utility for copying blobs or files to and from a storage account.",
          answer: true,
          why: "AzCopy is a command-line tool built for fast, scriptable data transfers to Azure Storage.",
        },
        {
          text: "Azure Storage Explorer is a command-line utility that is available only in Azure Cloud Shell.",
          answer: false,
          why: "Storage Explorer is a standalone graphical application you install on Windows, macOS, or Linux.",
        },
        {
          text: "Azure File Sync can keep an on-premises Windows Server synchronized with an Azure file share.",
          answer: true,
          why: "File Sync caches Azure file shares on Windows Server so files stay accessible locally.",
        },
      ],
      explanation: "AzCopy is command line, Storage Explorer is a graphical app, and Azure File Sync keeps Windows Server and Azure Files in sync.",
    },
    {
      id: "ch02-ex-q08",
      set: "exam",
      type: "yesno",
      prompt: "A company plans to migrate its on-premises datacenter to Azure.",
      statements: [
        {
          text: "Azure Migrate is a central hub for assessing and migrating on-premises servers, databases, and web apps.",
          answer: true,
          why: "Azure Migrate provides discovery, assessment, and migration tools in one place.",
        },
        {
          text: "Azure Data Box is a physical device used to transfer large amounts of data to Azure offline.",
          answer: true,
          why: "You load data onto the device and ship it to an Azure datacenter, which suits very large datasets or slow links.",
        },
        {
          text: "Azure Data Box requires an ExpressRoute connection to transfer data to Azure.",
          answer: false,
          why: "Data Box is for offline transfer, so no network connection to Azure is needed.",
        },
      ],
      explanation: "Azure Migrate handles discovery and migration, and Data Box moves large amounts of data offline.",
    },
    {
      id: "ch02-ex-q09",
      set: "exam",
      type: "yesno",
      prompt: "Contoso is designing connectivity between virtual networks and its on-premises network.",
      statements: [
        {
          text: "Virtual network peering lets resources in two virtual networks communicate by using private IP addresses.",
          answer: true,
          why: "Peered networks behave as one for connectivity, and traffic stays on the Microsoft backbone.",
        },
        {
          text: "Azure ExpressRoute connections travel over the public internet.",
          answer: false,
          why: "ExpressRoute is a private connection through a connectivity provider and does not use the public internet.",
        },
        {
          text: "Azure VPN Gateway sends encrypted traffic over the public internet between a virtual network and an on-premises location.",
          answer: true,
          why: "A site-to-site VPN uses an encrypted tunnel across the internet, unlike ExpressRoute.",
        },
      ],
      explanation: "Peering links virtual networks, VPN Gateway uses encrypted tunnels over the internet, and ExpressRoute is private.",
    },
    {
      id: "ch02-ex-q10",
      set: "exam",
      type: "yesno",
      prompt: "An administrator is configuring access to an Azure storage account.",
      statements: [
        {
          text: "A private endpoint gives the service a private IP address from your virtual network.",
          answer: true,
          why: "A private endpoint is a network interface in your virtual network that connects privately to the Azure service.",
        },
        {
          text: "Traffic from a virtual network to a service over a private endpoint travels over the public internet.",
          answer: false,
          why: "Private endpoint traffic stays on the Microsoft backbone network by way of Azure Private Link.",
        },
        {
          text: "A service with a public endpoint can be reached from the internet unless network rules restrict access.",
          answer: true,
          why: "A public endpoint is reachable by using a public IP address. Firewall rules can limit who can connect.",
        },
      ],
      explanation: "Private endpoints bring a service into your virtual network, while public endpoints are reachable over the internet.",
    },
    {
      id: "ch02-ex-q11",
      set: "exam",
      type: "yesno",
      prompt: "A company is evaluating Azure directory services.",
      statements: [
        {
          text: "Microsoft Entra ID is a cloud-based identity and access management service.",
          answer: true,
          why: "Entra ID handles sign-in and access to Microsoft 365, Azure, and other apps.",
        },
        {
          text: "Microsoft Entra Domain Services provides managed domain services, such as domain join and group policy, without domain controllers that you manage.",
          answer: true,
          why: "Entra Domain Services is a managed domain for legacy apps that need domain join, LDAP, or Kerberos.",
        },
        {
          text: "Microsoft Entra ID requires you to deploy and patch domain controllers.",
          answer: false,
          why: "Entra ID is a managed cloud service. There are no domain controllers to deploy or patch.",
        },
      ],
      explanation: "Both Entra ID and Entra Domain Services are managed by Microsoft, so you do not run domain controllers for either.",
    },
    {
      id: "ch02-ex-q12",
      set: "exam",
      type: "yesno",
      prompt: "A security team is reviewing sign-in options for employees.",
      statements: [
        {
          text: "Windows Hello for Business, the Microsoft Authenticator app, and FIDO2 security keys are passwordless methods.",
          answer: true,
          why: "Passwordless sign-in replaces the password with something you have plus a biometric or PIN.",
        },
        {
          text: "Single sign-on (SSO) requires users to sign in separately to each application.",
          answer: false,
          why: "SSO lets users sign in once and access multiple applications without signing in again.",
        },
        {
          text: "A Conditional Access policy can use signals such as user location or device to decide whether to grant access.",
          answer: true,
          why: "Conditional Access applies if-then rules that combine signals and then allow, block, or require MFA.",
        },
      ],
      explanation: "SSO reduces repeated sign-ins, passwordless removes the password, and Conditional Access decides access based on signals.",
    },
    {
      id: "ch02-ex-q13",
      set: "exam",
      type: "yesno",
      prompt: "An organization is adopting a Zero Trust approach and a defense-in-depth strategy.",
      statements: [
        {
          text: "Verify explicitly is one of the principles of Zero Trust.",
          answer: true,
          why: "The principles are verify explicitly, use least-privilege access, and assume breach.",
        },
        {
          text: "Zero Trust treats traffic inside the corporate network as trusted by default.",
          answer: false,
          why: "Zero Trust assumes no implicit trust based on network location. Every request is verified.",
        },
        {
          text: "Defense in depth protects data by using multiple layers, such as physical security, identity, network, compute, and application.",
          answer: true,
          why: "If one layer is breached, the next layer still protects the data.",
        },
      ],
      explanation: "Zero Trust removes implicit trust, and defense in depth adds layers so one failure does not expose the data.",
    },
    {
      id: "ch02-ex-q14",
      set: "exam",
      type: "multi",
      prompt: "Which two statements about containers are true?",
      options: [
        "Containers share the host operating system kernel, so they use fewer resources than virtual machines.",
        "Each container includes its own full guest operating system.",
        "An app and its dependencies can be packaged so that it runs the same way in any environment.",
        "Containers can run only in Azure and cannot run on-premises.",
      ],
      answer: [0, 2],
      explanation:
        "Containers package an app with its dependencies and share the host kernel, which makes them lighter than VMs. A full guest OS per instance describes a virtual machine.",
    },
    {
      id: "ch02-ex-q15",
      set: "exam",
      type: "multi",
      prompt: "Which two statements about availability sets and virtual machine scale sets are true?",
      options: [
        "Availability sets protect against the failure of an entire Azure region.",
        "Availability sets spread VMs across fault domains and update domains.",
        "Virtual machine scale sets let you create and manage a group of load-balanced VMs that can autoscale.",
        "Virtual machine scale sets require every VM to run a different operating system image.",
      ],
      answer: [1, 2],
      explanation:
        "Availability sets protect against hardware failures and planned maintenance within a datacenter, not against a regional outage. Scale sets run identical, load-balanced VMs that can scale automatically.",
    },
    {
      id: "ch02-ex-q16",
      set: "exam",
      type: "multi",
      prompt: "Which two statements about Azure Virtual Desktop are true?",
      options: [
        "It runs only Linux desktops that are hosted in Azure.",
        "It requires hardware to be installed in your on-premises datacenter.",
        "It delivers virtualized Windows desktops and apps from Azure.",
        "It supports Windows multi-session, so multiple users can share one VM.",
      ],
      answer: [2, 3],
      explanation:
        "Azure Virtual Desktop is a desktop and app virtualization service that runs in Azure. Multi-session Windows can host several users on one VM, which lowers cost.",
    },
    {
      id: "ch02-ex-q17",
      set: "exam",
      type: "multi",
      prompt: "Which two statements about Azure App Service are true?",
      options: [
        "It hosts web apps, REST APIs, and mobile back ends.",
        "You must patch the operating system of the hosting servers yourself.",
        "You must provision and manage the virtual machines that run your app.",
        "It provides built-in autoscale and load balancing.",
      ],
      answer: [0, 3],
      explanation:
        "App Service is PaaS. Azure manages the OS and infrastructure, and the platform includes autoscale and load balancing.",
    },
    {
      id: "ch02-ex-q18",
      set: "exam",
      type: "multi",
      prompt: "Which two resources are required to create an Azure virtual machine?",
      options: [
        "A public IP address",
        "A network interface",
        "A network security group",
        "An operating system disk",
        "A load balancer",
      ],
      answer: [1, 3],
      explanation:
        "Every VM needs an OS disk and a network interface that is connected to a virtual network. Public IP addresses, network security groups, and load balancers are optional.",
    },
    {
      id: "ch02-ex-q19",
      set: "exam",
      type: "multi",
      prompt: "Which two statements about Azure Files are true?",
      options: [
        "It stores unstructured object data that is accessed only through REST and HTTP.",
        "It is a messaging service that decouples application components.",
        "It offers fully managed file shares that can be accessed over SMB or NFS.",
        "A share can be mounted at the same time by cloud and on-premises machines.",
      ],
      answer: [2, 3],
      explanation:
        "Azure Files provides managed file shares that can be mounted concurrently from Azure and on-premises. Object storage is Blob Storage, and messaging is Queue Storage.",
    },
    {
      id: "ch02-ex-q20",
      set: "exam",
      type: "multi",
      prompt: "Which two statements about storage account types are true?",
      options: [
        "A premium account hosts Blob, Files, Queue, and Table storage together.",
        "A general-purpose v2 standard account supports Blob, Files, Queue, and Table storage.",
        "You cannot choose the performance tier when you create a storage account.",
        "Premium performance uses solid-state drives for low latency.",
      ],
      answer: [1, 3],
      explanation:
        "Standard general-purpose v2 supports all four core services. Premium accounts are specialized for one workload type and use SSDs for low latency.",
    },
    {
      id: "ch02-ex-q21",
      set: "exam",
      type: "multi",
      prompt: "Which two redundancy options keep copies of your data in multiple availability zones in the primary region?",
      options: ["Geo-zone-redundant storage (GZRS)", "Locally redundant storage (LRS)", "Geo-redundant storage (GRS)", "Zone-redundant storage (ZRS)"],
      answer: [0, 3],
      explanation:
        "ZRS and GZRS both replicate across availability zones in the primary region. LRS and GRS keep the primary copies in one datacenter.",
    },
    {
      id: "ch02-ex-q22",
      set: "exam",
      type: "multi",
      prompt: "Which two statements about external identities in Microsoft Entra are true?",
      options: [
        "They cannot use social identity providers such as Google.",
        "They let people outside your organization sign in with identities they already have.",
        "They require a new on-premises Active Directory account for each external user.",
        "B2B collaboration lets you invite guest users to access your apps and resources.",
      ],
      answer: [1, 3],
      explanation:
        "External identities let partners and customers use their own identities, and B2B collaboration invites them as guests. No on-premises account is needed.",
    },
    {
      id: "ch02-ex-q23",
      set: "exam",
      type: "multi",
      prompt: "Which two statements about built-in Azure RBAC roles are true?",
      options: [
        "Owner can manage resources and grant access to others.",
        "Reader can create and modify resources.",
        "Contributor can create and manage resources but cannot grant access to others.",
        "User Access Administrator can delete virtual machines.",
      ],
      answer: [0, 2],
      explanation:
        "Owner has full access including role assignments. Contributor can manage resources but not assign roles. Reader is view-only, and User Access Administrator manages access, not resources.",
    },
    {
      id: "ch02-ex-q24",
      set: "exam",
      type: "multi",
      prompt: "Which two capabilities does Microsoft Defender for Cloud provide?",
      options: [
        "Continuous assessment of your security posture with a secure score and recommendations",
        "Creation of budgets that alert you when spending reaches a threshold",
        "Deployment of resources by using ARM templates",
        "Threat protection for workloads in Azure, on-premises, and other clouds",
      ],
      answer: [0, 3],
      explanation:
        "Defender for Cloud assesses security posture and protects workloads across Azure, hybrid, and multicloud environments. Budgets and templates belong to other services.",
    },
    {
      id: "ch02-ex-q25",
      set: "exam",
      type: "multi",
      prompt: "Which two statements about Azure ExpressRoute are true?",
      options: [
        "It is a private connection through a connectivity provider that does not use the public internet.",
        "It encrypts all traffic by default.",
        "It lets a single laptop connect to a virtual network.",
        "It offers more reliability, faster speeds, and lower latencies than typical internet connections.",
        "It connects two virtual networks that are in different regions.",
      ],
      answer: [0, 3],
      explanation:
        "ExpressRoute is a private, dedicated connection with predictable performance. It does not encrypt by default, a single client uses point-to-site VPN, and virtual networks are linked with peering.",
    },
    {
      id: "ch02-ex-q26",
      set: "exam",
      type: "multi",
      prompt: "Which two statements about Azure subscriptions are true?",
      options: [
        "A resource can belong to more than one subscription.",
        "A subscription is a billing boundary and an access-control boundary.",
        "Each Microsoft Entra tenant can have only one subscription.",
        "You can use separate subscriptions to isolate environments such as development and production.",
      ],
      answer: [1, 3],
      explanation:
        "A subscription groups resources for billing and access control, and a tenant can have many. Each resource belongs to exactly one subscription.",
    },
  ],
});
