/*
 * AZ-900 Chapter 1: Describe cloud computing
 *
 * Question format:
 *   id          unique string
 *   set         which set this question belongs to (see `sets`)
 *   prompt      the question text
 *   options     array of answer strings
 *   answer      index (0-based) of the correct option in `options`
 *   explanation why the answer is correct
 *   hint        optional nudge shown on request in quiz mode
 *
 * Two more question kinds (set `type`; omitting it means a normal single-answer question):
 *
 *   type: "multi"   Choose N. `options` has 4-6 strings and `answer` is an ARRAY of correct indexes,
 *                   e.g. answer: [0, 2]. The UI says "Choose two." for you; do not put it in the prompt.
 *   type: "yesno"   A set of statements, each answered Yes or No. There is no `options` or `answer`; use
 *                   statements: [{ text, answer: true|false, why }]. `prompt` is the lead-in or scenario.
 *                   `explanation` is a one-line takeaway; each statement's `why` explains its own answer.
 */
(window.AZ900 = window.AZ900 || { chapters: [] }).chapters.push({
  id: "ch01",
  number: 1,
  title: "Describe cloud computing",
  sets: [
    { id: "set1", label: "Set 1" },
    { id: "set2", label: "Set 2" },
    { id: "exam", label: "Exam-style: Yes/No and choose-two" },
  ],
  questions: [
    // ---------------------------------------------------------------- Set 1
    {
      id: "ch01-s1-q01",
      set: "set1",
      prompt: "Which statement best describes cloud computing?",
      options: [
        "Buying and managing your own physical servers in a private datacenter",
        "Delivering computing services over the internet with pay-as-you-go pricing",
        "Storing files only on a local hard drive with network backups",
        "Leasing dedicated hardware for a fixed multi-year contract",
      ],
      answer: 1,
      explanation:
        "Cloud computing is the delivery of computing services (servers, storage, databases, networking, software, analytics) over the internet, typically billed on a pay-as-you-go basis.",
    },
    {
      id: "ch01-s1-q02",
      set: "set1",
      prompt:
        "In the shared responsibility model, which item is ALWAYS the customer's responsibility, regardless of whether you use IaaS, PaaS, or SaaS?",
      options: [
        "Physical datacenter security",
        "Physical network infrastructure",
        "Information and data",
        "Host hypervisor",
      ],
      answer: 2,
      explanation:
        "The customer always owns their information and data (along with accounts/identities and devices). The physical datacenter, network, and hosts are always the provider's responsibility.",
      hint: "Think about what the provider can never take ownership of.",
    },
    {
      id: "ch01-s1-q03",
      set: "set1",
      prompt:
        "In an IaaS deployment such as an Azure virtual machine, which task is the customer's responsibility?",
      options: [
        "Patching and maintaining the guest operating system",
        "Maintaining the physical servers",
        "Providing power and cooling to the datacenter",
        "Maintaining the physical network cabling",
      ],
      answer: 0,
      explanation:
        "With IaaS, Microsoft manages the physical infrastructure, but the customer manages the operating system, applications, and data on the VM.",
    },
    {
      id: "ch01-s1-q04",
      set: "set1",
      prompt:
        "Which cloud service type provides a managed environment where the provider handles the OS, runtime, and middleware, and you only manage your applications and data?",
      options: ["IaaS", "SaaS", "On-premises", "PaaS"],
      answer: 3,
      explanation:
        "Platform as a Service (PaaS) lets developers build, deploy, and manage apps without managing the underlying OS and infrastructure. Azure App Service is an example.",
    },
    {
      id: "ch01-s1-q05",
      set: "set1",
      prompt: "Which of the following is an example of Software as a Service (SaaS)?",
      options: [
        "Azure Virtual Machines",
        "Microsoft 365 (Outlook, Word Online)",
        "Azure App Service",
        "Azure Virtual Network",
      ],
      answer: 1,
      explanation:
        "SaaS delivers complete, ready-to-use applications over the internet. Microsoft 365 is a classic SaaS example; Virtual Machines are IaaS and App Service is PaaS.",
    },
    {
      id: "ch01-s1-q06",
      set: "set1",
      prompt: "Which description matches capital expenditure (CapEx)?",
      options: [
        "Paying only for the compute time you consume each month",
        "A subscription fee billed per user per month",
        "Upfront spending on physical infrastructure that depreciates over time",
        "Pay-per-execution pricing for serverless functions",
      ],
      answer: 2,
      explanation:
        "CapEx is upfront spending on physical assets such as servers and datacenters, whose value depreciates. Cloud moves spending toward OpEx.",
    },
    {
      id: "ch01-s1-q07",
      set: "set1",
      prompt: "What is the consumption-based model in cloud computing?",
      options: [
        "You pay a fixed annual fee regardless of usage",
        "You pay for hardware upfront and then use it for free",
        "You pay only for the resources you use, with no upfront costs",
        "You pay only when the service is unavailable",
      ],
      answer: 2,
      explanation:
        "With consumption-based pricing, you pay for what you use. It shifts cost from CapEx to OpEx and avoids buying capacity you may not need.",
    },
    {
      id: "ch01-s1-q08",
      set: "set1",
      prompt:
        "Which cloud model is owned and operated by a cloud provider, with resources shared among multiple organizations?",
      options: ["Public cloud", "Private cloud", "Hybrid cloud", "Community datacenter"],
      answer: 0,
      explanation:
        "In a public cloud, the provider (such as Microsoft Azure) owns the hardware and shares it across multiple customers (tenants).",
    },
    {
      id: "ch01-s1-q09",
      set: "set1",
      prompt:
        "A cloud environment used exclusively by a single organization, whether hosted on-premises or by a third party, is called a:",
      options: ["Public cloud", "Multi-tenant cloud", "Hybrid cloud", "Private cloud"],
      answer: 3,
      explanation:
        "A private cloud is dedicated to one organization, giving it greater control and customization, but that organization usually carries more cost and management burden.",
    },
    {
      id: "ch01-s1-q10",
      set: "set1",
      prompt:
        "A company must keep sensitive customer records in its own datacenter for compliance, but wants to run public-facing web apps in Azure. Which cloud model fits?",
      options: ["Hybrid cloud", "Public cloud only", "Private cloud only", "Serverless"],
      answer: 0,
      explanation:
        "A hybrid cloud combines on-premises/private infrastructure with public cloud, letting you keep sensitive workloads local while using the cloud for everything else.",
    },
    {
      id: "ch01-s1-q11",
      set: "set1",
      prompt: 'What does "scaling out" (horizontal scaling) mean?',
      options: [
        "Adding more CPU and RAM to an existing VM",
        "Moving a workload to a different region",
        "Adding more instances (such as additional VMs) to handle load",
        "Reducing the size of a VM to save money",
      ],
      answer: 2,
      explanation:
        "Scale out adds more instances. Scale up (vertical scaling) adds more power such as CPU or memory to an existing instance.",
      hint: "Out = wider, up = bigger.",
    },
    {
      id: "ch01-s1-q12",
      set: "set1",
      prompt:
        "An online retailer's website automatically adds servers during a holiday sale and removes them afterward. Which cloud benefit is this?",
      options: ["Governance", "Elasticity", "Economies of scale", "Capital expenditure"],
      answer: 1,
      explanation:
        "Elasticity is the ability to automatically add or remove resources in response to real-time demand, so you pay only for what's needed.",
    },
    {
      id: "ch01-s1-q13",
      set: "set1",
      prompt:
        "Which cloud benefit focuses on keeping applications running and accessible with minimal downtime, often backed by an SLA?",
      options: ["High availability", "Predictability", "Governance", "Manageability"],
      answer: 0,
      explanation:
        "High availability means your services remain up and accessible. Cloud providers publish SLAs (for example, 99.9% or 99.99% uptime) that quantify it.",
    },
    {
      id: "ch01-s1-q14",
      set: "set1",
      prompt:
        "Which benefit describes a system's ability to recover from failures (for example, by using multiple regions) and continue to function?",
      options: ["Scalability", "Security", "Reliability", "Consumption-based pricing"],
      answer: 2,
      explanation:
        "Reliability is resilience: the ability to recover from failure and keep working. Cloud's global footprint and redundancy options make this easier to achieve.",
    },
    {
      id: "ch01-s1-q15",
      set: "set1",
      prompt:
        "A team uses Azure Cost Management to forecast next month's spend and set budget alerts. Which cloud benefit does this support?",
      options: [
        "Predictability (cost)",
        "Elasticity",
        "Serverless computing",
        "Reliability",
      ],
      answer: 0,
      explanation:
        "Predictability covers both performance (autoscaling, load balancing) and cost (forecasting and cost-analysis tools) so you can plan with confidence.",
    },
    {
      id: "ch01-s1-q16",
      set: "set1",
      prompt:
        "A company uses Azure Policy to require that all resources are deployed only in approved regions and carry specific tags. Which cloud benefit is this?",
      options: ["Elasticity", "Governance", "Economies of scale", "High availability"],
      answer: 1,
      explanation:
        "Governance in the cloud means enforcing standards, policies, and compliance requirements, which is what Azure Policy does.",
    },
    {
      id: "ch01-s1-q17",
      set: "set1",
      prompt: "Which of the following is an example of the manageability benefit of the cloud?",
      options: [
        "Paying less per unit because of the provider's purchasing volume",
        "Keeping data inside a single physical building",
        "Replacing servers every three to five years",
        "Deploying and managing resources through the portal, CLI, APIs, or templates",
      ],
      answer: 3,
      explanation:
        "Manageability covers management OF the cloud (portal, CLI, PowerShell, ARM/Bicep templates, APIs, auto-scaling) and management IN the cloud (monitoring and configuring resources).",
    },
    {
      id: "ch01-s1-q18",
      set: "set1",
      prompt:
        "Why can cloud providers like Microsoft offer lower per-unit prices than most organizations can achieve on their own?",
      options: [
        "Economies of scale from buying and operating at massive volume",
        "They don't have to pay for electricity",
        "They use only private cloud models",
        "They avoid regulatory requirements",
      ],
      answer: 0,
      explanation:
        "Large providers get better prices on hardware, power, and operations because of massive purchasing volume and shared infrastructure, and they pass savings on to customers.",
    },
    {
      id: "ch01-s1-q19",
      set: "set1",
      prompt: "Which statement about serverless computing (such as Azure Functions) is correct?",
      options: [
        "There are no servers involved at all",
        "The customer must patch the underlying servers",
        "It is only available in a private cloud",
        "The provider manages the servers while you focus on code and pay per execution",
      ],
      answer: 3,
      explanation:
        "Servers still exist, but the provider manages them entirely. You deploy code, it scales automatically, and you're billed based on execution and resources consumed.",
    },
    {
      id: "ch01-s1-q20",
      set: "set1",
      prompt:
        "A company wants to migrate its existing on-premises virtual machines to the cloud with minimal changes and keep full control of the OS. Which service type fits best?",
      options: ["SaaS", "PaaS", "IaaS", "Serverless"],
      answer: 2,
      explanation:
        "IaaS gives the most control, with virtual machines, storage, and networks where you manage the OS and apps. It's the typical choice for lift-and-shift migrations.",
    },

    // ---------------------------------------------------------------- Set 2
    {
      id: "ch01-s2-q01",
      set: "set2",
      prompt: "Which of the following is an example of operational expenditure (OpEx)?",
      options: [
        "Purchasing 20 physical servers for a new datacenter",
        "Building a new server room with cooling and backup power",
        "Receiving a monthly bill for the Azure VMs you ran that month",
        "Buying network switches that will be depreciated over five years",
      ],
      answer: 2,
      explanation:
        "OpEx is spending on services as you use them and being billed for them now. Cloud billing is typically OpEx, while buying hardware is CapEx.",
    },
    {
      id: "ch01-s2-q02",
      set: "set2",
      prompt:
        "In a traditional on-premises datacenter, who is responsible for physical security, hardware, the OS, and the applications?",
      options: [
        "The organization that owns the datacenter",
        "The hardware vendor",
        "A public cloud provider",
        "The internet service provider",
      ],
      answer: 0,
      explanation:
        "On-premises, the organization is responsible for every layer. Moving to cloud service types shifts more of those responsibilities to the provider.",
    },
    {
      id: "ch01-s2-q03",
      set: "set2",
      prompt:
        "In a SaaS solution such as Microsoft 365, which of the following remains the customer's responsibility?",
      options: [
        "Patching the operating system",
        "Maintaining the application code",
        "Replacing failed physical hardware",
        "Managing user accounts and who can access their data",
      ],
      answer: 3,
      explanation:
        "Even with SaaS, the customer is still responsible for their data, user accounts and identities, and devices. The provider handles the app, OS, and infrastructure.",
    },
    {
      id: "ch01-s2-q04",
      set: "set2",
      prompt: "Which of the following is an example of a PaaS offering?",
      options: [
        "Azure Virtual Machines",
        "Azure SQL Database",
        "Microsoft 365",
        "Dynamics 365",
      ],
      answer: 1,
      explanation:
        "Azure SQL Database is a managed database platform: Microsoft handles the OS and database engine management. Virtual Machines are IaaS, and Microsoft 365 and Dynamics 365 are SaaS.",
    },
    {
      id: "ch01-s2-q05",
      set: "set2",
      prompt: "Which is a key advantage of PaaS compared with IaaS?",
      options: [
        "Full control over the guest operating system",
        "The ability to install any custom software on the host server",
        "Less management overhead, so teams can focus on building and running the application",
        "No dependency on the cloud provider",
      ],
      answer: 2,
      explanation:
        "PaaS removes the need to manage OS patching and infrastructure, which speeds up development. The trade-off is less control than IaaS.",
    },
    {
      id: "ch01-s2-q06",
      set: "set2",
      prompt: "Which is an advantage of the public cloud model?",
      options: [
        "No upfront hardware purchase and very high scalability",
        "Exclusive use of the physical hardware by one organization",
        "Complete control over the physical datacenter",
        "All data is guaranteed to stay on your premises",
      ],
      answer: 0,
      explanation:
        "Public cloud eliminates upfront CapEx for hardware and offers near-unlimited capacity on demand. The trade-off is less control over the underlying infrastructure.",
    },
    {
      id: "ch01-s2-q07",
      set: "set2",
      prompt: "Which is a typical disadvantage of a private cloud?",
      options: [
        "It cannot be secured",
        "It is always shared with other tenants",
        "It cannot be customized",
        "The organization bears higher costs and more management responsibility",
      ],
      answer: 3,
      explanation:
        "A private cloud gives control and customization, but the organization usually has to buy, maintain, and scale the hardware itself, which brings CapEx and operational effort.",
    },
    {
      id: "ch01-s2-q08",
      set: "set2",
      prompt: "What is a key advantage of a hybrid cloud?",
      options: [
        "It eliminates the need for any on-premises infrastructure",
        "Flexibility to keep regulated or legacy workloads on-premises while using public cloud for others",
        "The cloud provider manages all of your on-premises hardware",
        "It removes the need for network connectivity between environments",
      ],
      answer: 1,
      explanation:
        "Hybrid cloud lets you mix environments and use each where it fits best. Connectivity between on-premises and cloud is still required.",
    },
    {
      id: "ch01-s2-q09",
      set: "set2",
      prompt: "How does elasticity differ from general scalability?",
      options: [
        "Elasticity only allows resources to be reduced, never increased",
        "Elasticity only applies to physical servers",
        "Elasticity automatically adds and removes resources as demand changes",
        "Elasticity requires buying hardware in advance",
      ],
      answer: 2,
      explanation:
        "Scalability is the ability to adjust capacity to meet demand. Elasticity emphasizes doing it automatically and in both directions, scaling out when demand rises and back in when it falls.",
    },
    {
      id: "ch01-s2-q10",
      set: "set2",
      prompt:
        "A VM is running out of memory, so you resize it to a larger VM size with more RAM and CPU. Which type of scaling is this?",
      options: [
        "Vertical scaling (scale up)",
        "Horizontal scaling (scale out)",
        "Scale in",
        "Geo-replication",
      ],
      answer: 0,
      explanation:
        "Scaling up (vertical) increases the capacity of an existing resource. Scaling out (horizontal) adds more instances.",
    },
    {
      id: "ch01-s2-q11",
      set: "set2",
      prompt: "Which statement about cloud security is correct?",
      options: [
        "Moving to the cloud transfers all security responsibility to the provider",
        "Public clouds cannot meet compliance requirements",
        "Security in the cloud is only a concern for private clouds",
        "The provider supplies built-in security controls and certifications, but customers must still configure and protect their own resources",
      ],
      answer: 3,
      explanation:
        "This is the shared responsibility model. Providers secure the underlying platform and offer compliance certifications, while customers secure their data, identities, and configurations.",
    },
    {
      id: "ch01-s2-q12",
      set: "set2",
      prompt: "Which design approach best improves the reliability of an application?",
      options: [
        "Running everything on a single VM in one datacenter",
        "Deploying redundant copies across multiple availability zones or regions",
        "Disabling backups to reduce cost",
        "Using the largest possible VM size",
      ],
      answer: 1,
      explanation:
        "Redundancy across zones or regions lets an application survive and recover from failures. A single VM is a single point of failure no matter how large it is.",
    },
    {
      id: "ch01-s2-q13",
      set: "set2",
      prompt: "Which capabilities support performance predictability in the cloud?",
      options: [
        "Autoscaling and load balancing",
        "Manual capacity planning once a year",
        "Buying fixed hardware for peak demand",
        "Removing monitoring to reduce overhead",
      ],
      answer: 0,
      explanation:
        "Autoscaling and load balancing help keep response times consistent as load changes. Cost predictability comes from forecasting and cost-analysis tools.",
    },
    {
      id: "ch01-s2-q14",
      set: "set2",
      prompt: "Which SLA allows for the LEAST amount of downtime?",
      options: ["99%", "99.5%", "99.99%", "99.9%"],
      answer: 2,
      explanation:
        "99.99% allows about 52 minutes of downtime per year, compared with roughly 8.8 hours for 99.9% and about 3.65 days for 99%. Each added nine means less allowed downtime.",
      hint: "More nines = less downtime.",
    },
    {
      id: "ch01-s2-q15",
      set: "set2",
      prompt:
        "A small piece of code runs only when a file is uploaded to storage and you are billed only for each execution. Which approach is this?",
      options: [
        "An always-on IaaS virtual machine",
        "A private cloud",
        "An on-premises server",
        "Serverless computing",
      ],
      answer: 3,
      explanation:
        "Serverless (for example Azure Functions) runs event-driven code, scales automatically, and bills per execution, with no servers for you to manage.",
    },
    {
      id: "ch01-s2-q16",
      set: "set2",
      prompt:
        "A company buys enough servers to handle its busiest day of the year, so most of the hardware sits idle the rest of the time. Which cloud capability directly addresses this problem?",
      options: [
        "Larger upfront CapEx budgets",
        "Consumption-based pricing with on-demand scaling",
        "Longer hardware depreciation schedules",
        "Buying more physical servers in advance",
      ],
      answer: 1,
      explanation:
        "Over-provisioning for peak demand wastes money. Cloud lets you scale on demand and pay only for what you use.",
    },
    {
      id: "ch01-s2-q17",
      set: "set2",
      prompt:
        "As you move from IaaS to PaaS, which responsibility shifts from the customer to the cloud provider?",
      options: [
        "Information and data",
        "User accounts and identities",
        "Operating system and runtime management",
        "Devices used to access the service",
      ],
      answer: 2,
      explanation:
        "With PaaS the provider takes over the OS and runtime. Customers still own their data, identities, and devices in every model.",
    },
    {
      id: "ch01-s2-q18",
      set: "set2",
      prompt: "Which option places the LEAST responsibility on the customer?",
      options: ["SaaS", "PaaS", "IaaS", "On-premises"],
      answer: 0,
      explanation:
        "SaaS shifts the most responsibility to the provider, who manages the application, platform, and infrastructure. On-premises places the most on the customer.",
    },
    {
      id: "ch01-s2-q19",
      set: "set2",
      prompt: "What does multi-tenancy mean in a public cloud?",
      options: [
        "Each customer gets their own private physical datacenter",
        "Customers can see each other's data",
        "The cloud provider operates in several countries",
        "Multiple customers share the same physical infrastructure while remaining logically isolated",
      ],
      answer: 3,
      explanation:
        "Multi-tenancy lets many customers share hardware efficiently, which supports economies of scale, while the platform keeps each tenant's data and resources isolated.",
    },
    {
      id: "ch01-s2-q20",
      set: "set2",
      prompt: "Which is a common use case for IaaS?",
      options: [
        "Using a hosted email and calendar application",
        "Quickly creating and removing test and development environments",
        "Letting the provider manage your application code",
        "Running an application with no infrastructure to configure",
      ],
      answer: 1,
      explanation:
        "IaaS gives you on-demand VMs, storage, and networks, which makes it well suited for test/dev environments, lift-and-shift migrations, and backup or disaster recovery.",
    },
    // ---------------------------------------------------------------- Exam-style (Yes/No and choose-two)
    {
      id: "ch01-ex-q01",
      set: "exam",
      type: "yesno",
      prompt: "Contoso runs its web application on Azure virtual machines (IaaS).",
      statements: [
        {
          text: "Contoso is responsible for installing operating system updates on the virtual machines.",
          answer: true,
          why: "With IaaS the customer manages the guest operating system, including patching.",
        },
        {
          text: "Microsoft is responsible for the physical hosts and the physical network that the virtual machines run on.",
          answer: true,
          why: "The physical datacenter, network, and hosts are always the cloud provider's responsibility.",
        },
        {
          text: "Contoso is responsible for the physical security of the Azure datacenter.",
          answer: false,
          why: "Physical security of the datacenter belongs to Microsoft in every service type.",
        },
        {
          text: "Contoso is responsible for protecting its own data and managing its user accounts.",
          answer: true,
          why: "Information and data, devices, and accounts and identities always stay with the customer.",
        },
      ],
      explanation:
        "Responsibility shifts toward Microsoft as you move from IaaS to PaaS to SaaS, but data, devices, and accounts always stay with the customer.",
    },
    {
      id: "ch01-ex-q02",
      set: "exam",
      type: "yesno",
      prompt: "A company is choosing a cloud model for its workloads.",
      statements: [
        {
          text: "In a public cloud, the organization that uses the services owns and maintains the hardware.",
          answer: false,
          why: "In a public cloud the provider owns and operates the hardware, which is shared by many customers.",
        },
        {
          text: "A private cloud can be hosted in an organization's own on-premises datacenter.",
          answer: true,
          why: "A private cloud is used by a single organization and can run in its own datacenter or be hosted by a third party.",
        },
        {
          text: "A hybrid cloud combines a private cloud or on-premises datacenter with a public cloud.",
          answer: true,
          why: "Hybrid is defined by combining the two so workloads and data can be placed where they fit best.",
        },
      ],
      explanation: "Public means provider-owned and shared, private means dedicated to one organization, and hybrid combines them.",
    },
    {
      id: "ch01-ex-q03",
      set: "exam",
      type: "yesno",
      prompt: "Fabrikam is moving its on-premises servers to Azure virtual machines.",
      statements: [
        {
          text: "Spending on servers moves from capital expenditure (CapEx) to operational expenditure (OpEx).",
          answer: true,
          why: "Azure bills for what you use, so there is no large up-front hardware purchase to depreciate.",
        },
        {
          text: "Fabrikam must buy enough capacity up front to cover its peak demand.",
          answer: false,
          why: "In the consumption-based model you add or remove capacity as needed and pay for what you use.",
        },
        {
          text: "A virtual machine that has been deallocated continues to incur compute charges.",
          answer: false,
          why: "Deallocating releases the compute resources and stops compute billing. Attached disks still incur storage charges.",
        },
      ],
      explanation: "The consumption-based model replaces up-front capital spending with pay-as-you-go operating costs.",
    },
    {
      id: "ch01-ex-q04",
      set: "exam",
      type: "yesno",
      prompt: "A retail site must handle spikes in holiday traffic.",
      statements: [
        {
          text: "Scaling up (vertical scaling) increases the CPU or memory of an existing virtual machine.",
          answer: true,
          why: "Vertical scaling makes a single instance bigger.",
        },
        {
          text: "Scaling out (horizontal scaling) adds more instances of a resource, such as more virtual machines.",
          answer: true,
          why: "Horizontal scaling spreads the load across additional instances.",
        },
        {
          text: "Scaling out means moving a workload to a larger virtual machine size.",
          answer: false,
          why: "Moving to a larger size is scaling up. Scaling out adds instances.",
        },
        {
          text: "Autoscaling can add and remove instances automatically based on demand.",
          answer: true,
          why: "Autoscale rules react to metrics or schedules so capacity follows demand without manual changes.",
        },
      ],
      explanation: "Up and down change the size of one instance. Out and in change the number of instances.",
    },
    {
      id: "ch01-ex-q05",
      set: "exam",
      type: "yesno",
      prompt: "A developer builds an order-processing function that runs when a message arrives in a queue.",
      statements: [
        {
          text: "Servers still exist in a serverless model, but the provider provisions and manages them.",
          answer: true,
          why: "Serverless hides server management from you. It does not remove servers.",
        },
        {
          text: "The developer must provision and patch the underlying virtual machines.",
          answer: false,
          why: "In serverless compute the provider manages the infrastructure, including patching.",
        },
        {
          text: "Azure Functions is an example of a serverless compute service.",
          answer: true,
          why: "Azure Functions runs event-triggered code without you managing servers.",
        },
      ],
      explanation: "Serverless means you run code in response to events and let the provider handle the infrastructure.",
    },
    {
      id: "ch01-ex-q06",
      set: "exam",
      type: "yesno",
      prompt: "A company is classifying the services it uses by cloud service type.",
      statements: [
        {
          text: "Using Exchange Online for company email is an example of software as a service (SaaS).",
          answer: true,
          why: "Exchange Online is a finished application delivered over the internet and managed by Microsoft.",
        },
        {
          text: "Azure App Service is an example of infrastructure as a service (IaaS).",
          answer: false,
          why: "App Service is platform as a service (PaaS). You deploy code and Azure manages the operating system.",
        },
        {
          text: "With IaaS, the customer is responsible for managing the operating system.",
          answer: true,
          why: "IaaS gives you the virtualized hardware. Everything from the guest OS up is yours to manage.",
        },
        {
          text: "With PaaS, the customer manages the applications and data but not the underlying operating system.",
          answer: true,
          why: "PaaS removes OS and runtime management so you focus on the app and its data.",
        },
      ],
      explanation: "IaaS gives the most control, PaaS manages the platform for you, and SaaS delivers a ready-to-use application.",
    },
    {
      id: "ch01-ex-q07",
      set: "exam",
      type: "yesno",
      prompt: "A team is evaluating the reliability and predictability benefits of the cloud.",
      statements: [
        {
          text: "Reliability is the ability of a system to recover from failures and continue to function.",
          answer: true,
          why: "That is the definition of reliability. In the cloud it is improved by distributing resources across datacenters and regions.",
        },
        {
          text: "Autoscaling and load balancing help provide performance predictability.",
          answer: true,
          why: "They keep response times steady as demand changes.",
        },
        {
          text: "Reliability is best achieved by deploying all resources in a single datacenter.",
          answer: false,
          why: "A single datacenter is a single point of failure. Spreading resources across zones and regions improves reliability.",
        },
      ],
      explanation: "Reliability comes from redundancy, and performance predictability comes from scaling and load balancing.",
    },
    {
      id: "ch01-ex-q08",
      set: "exam",
      type: "multi",
      prompt: "Which two statements describe the consumption-based model?",
      options: [
        "You pay only for the resources you consume, billed according to usage.",
        "You do not make an up-front purchase of hardware to get started.",
        "You commit to a fixed monthly capacity whether or not you use it.",
        "You must size your capacity for peak demand and pay for it all year.",
      ],
      answer: [0, 1],
      explanation:
        "Consumption-based pricing means no up-front infrastructure cost, no fixed capacity commitment, and billing that follows usage.",
    },
    {
      id: "ch01-ex-q09",
      set: "exam",
      type: "multi",
      prompt:
        "Which two responsibilities always stay with the customer, whether the workload runs on-premises or uses IaaS, PaaS, or SaaS?",
      options: [
        "Information and data",
        "The physical network",
        "Accounts and identities",
        "The physical hosts",
        "The operating system in a SaaS solution",
      ],
      answer: [0, 2],
      explanation:
        "Information and data, devices, and accounts and identities are always the customer's responsibility. The physical network and hosts always belong to the provider, and the OS in SaaS is the provider's too.",
    },
    {
      id: "ch01-ex-q10",
      set: "exam",
      type: "multi",
      prompt: "Which two scenarios are the best fit for a hybrid cloud?",
      options: [
        "A startup with no existing infrastructure wants to avoid owning any hardware.",
        "A bank keeps regulated customer records in its own datacenter and hosts its public website in Azure.",
        "A developer wants a short-lived test site with no connection to any other system.",
        "A retailer runs its inventory system on-premises and adds Azure capacity for seasonal peaks.",
      ],
      answer: [1, 3],
      explanation:
        "Hybrid fits organizations that must keep some workloads or data on-premises while using the public cloud for others or for extra capacity. The startup is a pure public cloud case.",
    },
    {
      id: "ch01-ex-q11",
      set: "exam",
      type: "multi",
      prompt: "Which two scenarios are best suited to platform as a service (PaaS)?",
      options: [
        "Running a legacy application that needs custom operating system drivers",
        "Providing employees with a hosted email and calendar service",
        "Hosting a web API without patching or managing the operating system",
        "Migrating a server unchanged by lifting and shifting it",
        "Building an app on a managed database service that the provider maintains",
      ],
      answer: [2, 4],
      explanation:
        "PaaS lets developers run apps and use managed services without managing the OS. Custom drivers and lift-and-shift need IaaS, and hosted email is SaaS.",
    },
    {
      id: "ch01-ex-q12",
      set: "exam",
      type: "multi",
      prompt: "Which two are examples of manageability in the cloud?",
      options: [
        "Replicating data to a second region to survive a regional outage",
        "Deploying identical environments repeatedly from templates",
        "Purchasing and racking additional servers in a datacenter",
        "Managing resources through a web portal, command-line tools, or APIs",
        "Obtaining a compliance certification for the datacenter",
      ],
      answer: [1, 3],
      explanation:
        "Manageability covers deploying and managing resources with templates, portals, command-line tools, and APIs. Replication supports reliability and certifications support governance.",
    },
    {
      id: "ch01-ex-q13",
      set: "exam",
      type: "multi",
      prompt: "Which two statements about high availability and scalability in the cloud are true?",
      options: [
        "Horizontal scaling adds more instances to share the load.",
        "Vertical scaling adds more instances behind a load balancer.",
        "High availability guarantees that no data can ever be lost.",
        "Autoscaling can adjust capacity automatically as demand changes.",
      ],
      answer: [0, 3],
      explanation:
        "Horizontal scaling adds instances and autoscaling adjusts capacity automatically. Vertical scaling makes one instance larger, and high availability is about uptime, not a guarantee against data loss.",
    },
    {
      id: "ch01-ex-q14",
      set: "exam",
      type: "multi",
      prompt: "Which two statements about CapEx and OpEx are true?",
      options: [
        "OpEx requires purchasing servers before you can use them.",
        "CapEx is billed monthly based on how much you use.",
        "CapEx is up-front spending on physical infrastructure that is depreciated over time.",
        "Cloud services such as Azure virtual machines are typically billed as OpEx.",
      ],
      answer: [2, 3],
      explanation:
        "CapEx is up-front spending on physical assets. OpEx is spending on services as you use them, which is how cloud services are billed.",
    },
  ],
});
