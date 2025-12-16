// Global variables
let currentSection = 0;
const totalSections = 3; // Home, About, Contact
let isTransitioning = false;
let loadingComplete = false;
let isMobileDevice = false;
let initialTargetSection = 0; // Store initial URL target section

// Strip legacy blog/faq to avoid heavy parsing/loading
window.blogArticles = {};
window.showArticle = function() {};

// Scroll configuration removed - will be reimplemented later

/* BEGIN REMOVED BLOG/FAQ CODE
// ============================================
// BLOG ARTICLE SYSTEM - Must be defined early for initializeIntroSequence
// ============================================

// Blog articles content (global for access from initializeIntroSequence)
window.blogArticles = {
    'future-of-enterprise-ai': {
        category: 'AI Strategy',
        date: 'Dec 2025',
        readTime: '8 min read',
        title: 'The Future of Enterprise AI: From Hype to Reality',
        excerpt: 'As we approach 2026, artificial intelligence has moved beyond experimental phases into core business operations. Discover how leading companies are implementing AI strategies that deliver measurable ROI and sustainable competitive advantages.',
        content: `
            <h2>The AI Revolution is Here</h2>
            <p>After years of experimentation and pilot programs, artificial intelligence has finally reached the mainstream in enterprise environments. What was once considered cutting-edge technology is now becoming a critical component of business operations across industries.</p>
            
            <p>The transformation is remarkable: according to recent studies, over 75% of Fortune 500 companies now have active AI implementations, with the majority reporting measurable improvements in operational efficiency, decision-making, and customer satisfaction.</p>
            
            <h2>From Hype to Reality: What Changed?</h2>
            <p>Several key factors have contributed to this shift from experimental to essential:</p>
            
            <ul>
                <li><strong>Maturation of Technology:</strong> AI models have become more reliable, accurate, and easier to implement. Cloud-based solutions and pre-trained models have significantly lowered the technical barriers to entry.</li>
                <li><strong>Proven ROI:</strong> Early adopters have demonstrated clear returns on investment, making it easier for other companies to justify AI initiatives.</li>
                <li><strong>Competitive Pressure:</strong> Companies that don't adopt AI risk falling behind competitors who leverage it for efficiency gains and innovation.</li>
                <li><strong>Data Maturity:</strong> Organizations now have the data infrastructure and governance needed to effectively train and deploy AI systems.</li>
            </ul>
            
            <h2>Key Implementation Strategies</h2>
            <p>Successful enterprise AI implementations share several common characteristics:</p>
            
            <h3>Start with Clear Business Objectives</h3>
            <p>The most successful AI projects begin with specific, measurable business goals rather than technology-first thinking. Whether it's reducing customer support response times, improving forecasting accuracy, or automating document processing, clarity on desired outcomes is essential.</p>
            
            <h3>Build the Right Team</h3>
            <p>AI success requires collaboration between technical experts and business stakeholders. The most effective organizations create cross-functional teams that include data scientists, domain experts, and business leaders.</p>
            
            <h3>Focus on Data Quality</h3>
            <p>AI is only as good as the data it learns from. Investing in data infrastructure, governance, and quality assurance pays significant dividends in AI performance and reliability.</p>
            
            <h2>The Path Forward</h2>
            <p>As we look toward 2026 and beyond, several trends are emerging that will shape the future of enterprise AI:</p>
            
            <ul>
                <li><strong>Hybrid AI Approaches:</strong> Combining on-premise and cloud solutions to balance privacy, performance, and cost.</li>
                <li><strong>Industry-Specific Solutions:</strong> Moving beyond generic AI to specialized models trained for specific sectors and use cases.</li>
                <li><strong>Explainable AI:</strong> Growing emphasis on understanding and explaining AI decisions, particularly in regulated industries.</li>
                <li><strong>AI Governance:</strong> Establishing frameworks for ethical AI use, bias mitigation, and regulatory compliance.</li>
            </ul>
            
            <blockquote>The companies that will lead in the coming decade are those that view AI not as a technology project, but as a fundamental business transformation.</blockquote>
            
            <h2>Getting Started</h2>
            <p>If your organization is ready to move beyond AI hype to real implementation, the key is to start with a focused pilot project that addresses a specific business need. Success with one project builds organizational confidence and provides a foundation for broader AI adoption.</p>
            
            <p>At KWForce, we help companies navigate this transition with strategic planning, technical implementation, and ongoing support to ensure AI initiatives deliver measurable business value.</p>
        `
    },
    'local-llms-privacy-first': {
        category: 'Technology',
        date: 'Nov 2025',
        readTime: '6 min read',
        title: 'Local LLMs: Privacy-First AI Solutions',
        excerpt: 'Why more enterprises are choosing local Large Language Models over cloud-based alternatives. Learn about the security, compliance, and performance benefits of keeping your AI infrastructure in-house.',
        content: `
            <h2>The Privacy Challenge in AI</h2>
            <p>As organizations increasingly rely on Large Language Models (LLMs) for everything from document analysis to customer support, a critical question has emerged: where should this processing happen?</p>
            
            <p>While cloud-based AI services offer convenience and powerful capabilities, they come with significant privacy concerns. Every query, every document, every piece of data sent to cloud AI services leaves your organization's direct control. For industries handling sensitive information—finance, healthcare, legal, defense—this represents an unacceptable risk.</p>
            
            <p>Consider this scenario: A law firm uses a cloud-based AI to analyze confidential legal documents. While the AI provides helpful insights, copies of those privileged communications now exist on servers owned by a third party, potentially subject to subpoenas, data breaches, or unauthorized access.</p>
            
            <h2>Why Local LLMs Matter</h2>
            <p>Local LLMs—AI models that run entirely within your organization's infrastructure—offer a compelling alternative for enterprises with serious privacy and security requirements. The benefits extend far beyond simple data protection.</p>
            
            <h3>1. Complete Data Control</h3>
            <p>With local LLMs, your sensitive business information never leaves your premises. There's no third-party access, no cloud storage, no external processing. You maintain complete sovereignty over your data, ensuring compliance with regulations like GDPR, HIPAA, and industry-specific requirements.</p>
            
            <p>This isn't just about regulatory compliance—it's about competitive advantage. Your proprietary business intelligence, strategic plans, and operational data remain exclusively yours.</p>
            
            <h3>2. Performance and Reliability</h3>
            <p>Local deployment eliminates latency issues associated with cloud processing. Responses are instantaneous, even when processing large volumes of data. There's no dependence on internet connectivity or concerns about cloud service outages affecting critical business operations.</p>
            
            <h3>3. Cost Predictability</h3>
            <p>Cloud AI services typically charge per API call or token processed, making costs difficult to predict as usage scales. Local LLMs require upfront infrastructure investment but offer predictable operational costs regardless of usage volume—a significant advantage for organizations with high AI utilization.</p>
            
            <h3>4. Customization and Control</h3>
            <p>Local deployments allow complete customization of the AI model to your specific domain, terminology, and use cases. You can fine-tune the model on your proprietary data without concerns about that training data benefiting competitors or being used to improve a vendor's general-purpose model.</p>
            
            <h2>Real-World Applications</h2>
            <p>Organizations across industries are discovering practical benefits of local LLMs:</p>
            
            <ul>
                <li><strong>Healthcare:</strong> Analyzing patient records and medical literature while maintaining HIPAA compliance and patient privacy.</li>
                <li><strong>Finance:</strong> Processing sensitive financial data, transaction analysis, and regulatory compliance without exposing information to third parties.</li>
                <li><strong>Legal:</strong> Document review, contract analysis, and legal research while preserving attorney-client privilege.</li>
                <li><strong>Manufacturing:</strong> Analyzing proprietary processes, supply chain data, and trade secrets without risk of industrial espionage.</li>
            </ul>
            
            <h2>Implementation Considerations</h2>
            <p>Deploying local LLMs requires careful planning but offers significant long-term benefits for data-sensitive organizations. Key considerations include:</p>
            
            <h3>Infrastructure Requirements</h3>
            <p>Modern local LLMs can run on standard enterprise server hardware, though GPU acceleration significantly improves performance. The investment is substantial but justifiable when weighed against ongoing cloud API costs and privacy risks.</p>
            
            <h3>Technical Expertise</h3>
            <p>While local deployment is more complex than calling a cloud API, modern frameworks and tools have simplified the process. Organizations can either build internal expertise or partner with specialists to ensure successful implementation.</p>
            
            <h3>Model Selection</h3>
            <p>Choose models based on your specific use cases. Not every organization needs the largest, most powerful model—often, smaller, more efficient models provide excellent results for focused applications while requiring less infrastructure.</p>
            
            <blockquote>The future of enterprise AI is hybrid: leveraging cloud services where appropriate while maintaining local control over sensitive operations and data.</blockquote>
            
            <h2>Taking the First Step</h2>
            <p>Transitioning to local LLMs doesn't require an all-or-nothing approach. Start with a pilot project focused on a specific use case where privacy and data control are paramount. Success with one application builds organizational confidence and provides a foundation for broader adoption.</p>
            
            <p>At KWForce, our Local LLM Assistant is designed specifically for enterprises that refuse to compromise on data privacy. We handle the complexity of deployment, integration, and maintenance while you focus on deriving value from your AI investment.</p>
        `
    },
    'ai-integration-guide': {
        category: 'Best Practices',
        date: 'Nov 2025',
        readTime: '10 min read',
        title: 'AI Integration: A Step-by-Step Guide',
        excerpt: 'Successfully integrating AI into existing workflows requires careful planning and execution. This comprehensive guide walks you through the essential steps, from assessment to deployment and beyond.',
        content: `
            <h2>The AI Integration Challenge</h2>
            <p>Integrating AI into existing business processes is more complex than simply deploying new technology. It requires organizational change, process redesign, and cultural adaptation alongside technical implementation. Many organizations underestimate this complexity, leading to failed projects and wasted investments.</p>
            
            <p>However, those who approach AI integration systematically—with clear goals, strong stakeholder buy-in, and realistic expectations—consistently achieve transformative results. This guide provides a proven framework for successful AI integration based on hundreds of real-world implementations.</p>
            
            <h2>Phase 1: Assessment and Planning (Weeks 1-4)</h2>
            <p>The foundation of successful AI integration is thorough assessment and strategic planning. Rush this phase, and you risk building on shaky ground.</p>
            
            <h3>Map Current Processes</h3>
            <p>Start by documenting your existing workflows in detail. Where do bottlenecks occur? Which tasks are repetitive? What decisions require significant time or expertise? Understanding your current state is essential for identifying AI opportunities.</p>
            
            <p>Engage frontline employees in this process—they often have the best insights into operational inefficiencies and practical constraints that aren't visible from management's perspective.</p>
            
            <h3>Identify AI Opportunities</h3>
            <p>Not every process benefits from AI. Focus on areas where AI can provide significant value:</p>
            
            <ul>
                <li><strong>High-volume repetitive tasks</strong> that consume substantial human time</li>
                <li><strong>Complex decision-making</strong> requiring analysis of large amounts of data</li>
                <li><strong>Pattern recognition</strong> in data that humans struggle to identify</li>
                <li><strong>24/7 availability requirements</strong> like customer support or monitoring</li>
                <li><strong>Processes requiring instant responses</strong> that currently face delays</li>
            </ul>
            
            <h3>Prioritize Based on Impact and Feasibility</h3>
            <p>Create a simple matrix evaluating potential projects on two dimensions: business impact and implementation feasibility. Your first project should ideally be high-impact and relatively straightforward—quick wins build momentum and organizational confidence.</p>
            
            <h3>Define Success Metrics</h3>
            <p>Establish clear, measurable KPIs before implementation. Common metrics include time savings, cost reduction, accuracy improvements, customer satisfaction increases, or revenue growth. Be specific: "reduce invoice processing time by 50%" rather than "improve efficiency."</p>
            
            <h2>Phase 2: Pilot Project (Weeks 5-16)</h2>
            <p>Don't attempt to transform your entire organization at once. Choose a pilot project that is important enough to matter but not mission-critical enough that failure would cause serious business disruption.</p>
            
            <h3>Build the Right Team</h3>
            <p>Successful AI projects require collaboration between multiple disciplines:</p>
            
            <ul>
                <li><strong>Business owners</strong> who understand the process and can define requirements</li>
                <li><strong>Technical implementers</strong> who can deploy and integrate AI systems</li>
                <li><strong>Data professionals</strong> who ensure data quality and availability</li>
                <li><strong>Change management specialists</strong> who help users adapt to new workflows</li>
                <li><strong>Executive sponsor</strong> who provides resources and removes organizational obstacles</li>
            </ul>
            
            <h3>Prepare Your Data</h3>
            <p>AI quality depends heavily on data quality. Invest time cleaning, organizing, and validating data before implementation. This often takes longer than expected but is absolutely essential for success.</p>
            
            <p>Consider data privacy, security, and compliance requirements from the start. Addressing these concerns early prevents costly delays later in the project.</p>
            
            <h3>Start Small, Iterate Quickly</h3>
            <p>Rather than building a complete solution all at once, adopt an agile approach. Deploy a minimal viable product (MVP), gather feedback from real users, and iterate based on their experience.</p>
            
            <p>This approach reduces risk, accelerates learning, and ensures the final solution actually meets user needs rather than theoretical requirements defined in conference rooms.</p>
            
            <h3>Focus on User Experience</h3>
            <p>The most sophisticated AI is worthless if people won't use it. Design interfaces and workflows that are intuitive and actually improve the user's workday. Involve end users in design decisions—their input is invaluable.</p>
            
            <h2>Phase 3: Scale and Optimize (Months 5-12)</h2>
            <p>Once your pilot proves successful, you're ready to scale. But scaling isn't just about deploying to more users—it requires systematic optimization and adaptation.</p>
            
            <h3>Document Lessons Learned</h3>
            <p>Capture insights from your pilot: What worked well? What challenges did you face? How did users adapt? What would you do differently? These lessons inform your scaling strategy and help you avoid repeating mistakes.</p>
            
            <h3>Develop Training and Support</h3>
            <p>Create comprehensive training materials and support resources. Different user groups may need different levels of training—executives need strategic overview, power users need advanced features, and casual users need simple workflows.</p>
            
            <h3>Monitor and Measure</h3>
            <p>Continuously track your success metrics and compare them to baseline measurements. Are you achieving the expected benefits? Where are the gaps? Regular measurement allows you to course-correct before small issues become major problems.</p>
            
            <h3>Optimize Continuously</h3>
            <p>AI systems improve with use. As you gather more data and feedback, regularly update and refine your models. What works today may need adjustment tomorrow as business conditions change.</p>
            
            <h2>Phase 4: Organizational Transformation (Year 2+)</h2>
            <p>As AI integration succeeds in initial projects, opportunities for broader organizational transformation emerge. Companies that excel at AI often develop:</p>
            
            <ul>
                <li><strong>AI-first culture</strong> where teams naturally consider AI solutions for new challenges</li>
                <li><strong>Data infrastructure</strong> that makes information easily accessible for AI applications</li>
                <li><strong>Internal expertise</strong> that can independently develop and deploy AI solutions</li>
                <li><strong>Governance frameworks</strong> ensuring responsible, ethical AI use across the organization</li>
            </ul>
            
            <h2>Common Pitfalls to Avoid</h2>
            <p>Learn from others' mistakes:</p>
            
            <ul>
                <li><strong>Technology-first thinking:</strong> Starting with "we need AI" rather than "we need to solve problem X"</li>
                <li><strong>Underestimating change management:</strong> Focusing solely on technology while ignoring human factors</li>
                <li><strong>Lack of executive support:</strong> Treating AI as an IT project rather than a strategic business initiative</li>
                <li><strong>Poor data preparation:</strong> Rushing to implementation without ensuring data quality</li>
                <li><strong>Unrealistic expectations:</strong> Expecting AI to solve problems it's not suited for</li>
            </ul>
            
            <blockquote>Successful AI integration is 20% technology and 80% people, process, and organizational change.</blockquote>
            
            <h2>Your Next Steps</h2>
            <p>Ready to begin your AI integration journey? Start by conducting a thorough assessment of your current processes and identifying high-impact opportunities. Don't try to do everything at once—focus on one pilot project that can demonstrate clear value.</p>
            
            <p>At KWForce, we guide organizations through every phase of AI integration, from initial assessment through full-scale deployment. Our proven methodology ensures your AI investments deliver measurable business results while building internal capabilities for long-term success.</p>
        `
    },
    'automating-business-processes': {
        category: 'Innovation',
        date: 'Oct 2025',
        readTime: '7 min read',
        title: 'Automating Business Processes with AI',
        excerpt: 'Discover how intelligent automation is transforming traditional business processes. From document processing to customer service, AI is enabling unprecedented efficiency gains across industries.',
        content: `
            <h2>The Automation Revolution</h2>
            <p>Business process automation is entering a new era. While traditional automation handled structured, rule-based tasks—like moving data between systems or triggering actions based on predefined conditions—AI-powered automation can now handle complex, judgment-based processes that previously required human intelligence.</p>
            
            <p>This represents a fundamental shift in what's possible. Tasks that once seemed impossible to automate—reading unstructured documents, understanding customer intent, making context-aware decisions—are now being handled by AI systems with remarkable accuracy and speed.</p>
            
            <h2>The Difference Between Traditional and AI Automation</h2>
            <p>Traditional automation excels at repetitive, predictable tasks with clear rules. If condition A occurs, execute action B. But most business processes aren't that simple—they require understanding context, handling exceptions, and making judgment calls.</p>
            
            <p>AI automation bridges this gap by adding intelligence to automation. Instead of rigid rules, AI systems learn from examples, adapt to variations, and handle the kind of ambiguity that characterizes real-world business processes.</p>
            
            <h2>Key Areas for AI Automation</h2>
            <p>Across industries, certain business processes are seeing dramatic improvements from AI automation:</p>
            
            <h3>1. Document Processing and Data Extraction</h3>
            <p>Organizations handle millions of documents—invoices, contracts, forms, emails, reports—that contain valuable information locked in unstructured formats. AI can now read these documents, extract relevant data, classify content, and route information to appropriate systems automatically.</p>
            
            <p><strong>Real-world impact:</strong> A healthcare provider automated insurance claim processing, reducing processing time from 3 days to 3 hours while improving accuracy from 92% to 99.7%. Staff previously spending 30 hours weekly on data entry were redeployed to patient care.</p>
            
            <h3>2. Customer Service and Support</h3>
            <p>AI-powered chatbots and virtual assistants now handle complex customer inquiries, understand context across conversations, and seamlessly escalate to human agents when needed. Unlike earlier chatbots with rigid scripts, modern AI understands intent and responds intelligently to variations.</p>
            
            <p><strong>Real-world impact:</strong> An e-commerce company deployed AI chat support, handling 73% of customer inquiries automatically. Average response time dropped from 8 minutes to 30 seconds, while customer satisfaction scores increased by 22%.</p>
            
            <h3>3. Intelligent Data Analysis and Reporting</h3>
            <p>Instead of spending hours manually analyzing data and creating reports, AI can automatically identify trends, detect anomalies, generate insights, and produce narrative reports in natural language.</p>
            
            <p><strong>Real-world impact:</strong> A financial services firm automated their quarterly performance analysis. What previously required a team of analysts 40 hours per quarter now happens automatically in 2 hours, with more comprehensive analysis and earlier anomaly detection.</p>
            
            <h3>4. Process Orchestration and Decision-Making</h3>
            <p>AI can manage complex workflows involving multiple steps, systems, and decision points. It understands context, applies business logic, handles exceptions, and optimizes process flow in real-time.</p>
            
            <p><strong>Real-world impact:</strong> A logistics company uses AI to orchestrate shipping operations, automatically optimizing routes, handling exceptions, communicating with customers, and making real-time adjustments. Operating costs decreased by 18% while on-time delivery improved by 27%.</p>
            
            <h3>5. Email and Communication Management</h3>
            <p>AI can categorize incoming communications, extract action items, draft responses, route messages to appropriate teams, and flag urgent items—all while understanding context and maintaining appropriate tone.</p>
            
            <p><strong>Real-world impact:</strong> A customer success team automated email triage and response drafting. Response time to customer inquiries dropped from 24 hours to 2 hours, and the team handled 3x more inquiries with the same headcount.</p>
            
            <h2>Building a Business Case for AI Automation</h2>
            <p>When evaluating processes for AI automation, consider both quantifiable and strategic benefits:</p>
            
            <h3>Quantifiable Benefits</h3>
            <ul>
                <li><strong>Time savings:</strong> How many hours per week does this process consume?</li>
                <li><strong>Cost reduction:</strong> What's the fully-loaded cost of current manual processing?</li>
                <li><strong>Error reduction:</strong> What do mistakes cost in terms of rework, customer dissatisfaction, or compliance issues?</li>
                <li><strong>Speed improvements:</strong> How much would faster processing benefit the business?</li>
            </ul>
            
            <h3>Strategic Benefits</h3>
            <ul>
                <li><strong>Scalability:</strong> Handle volume spikes without proportional headcount increases</li>
                <li><strong>Consistency:</strong> Ensure uniform quality and compliance across all transactions</li>
                <li><strong>24/7 operations:</strong> Process work continuously without shifts or overtime</li>
                <li><strong>Employee satisfaction:</strong> Free staff from tedious work to focus on higher-value activities</li>
                <li><strong>Customer experience:</strong> Provide faster, more consistent service</li>
            </ul>
            
            <h2>Getting Started: A Practical Approach</h2>
            <p>Don't try to automate everything at once. Start with a systematic approach:</p>
            
            <h3>Step 1: Process Inventory</h3>
            <p>Document your key business processes, noting time consumption, error rates, and pain points. Engage frontline employees—they know where inefficiencies hide.</p>
            
            <h3>Step 2: Prioritize Opportunities</h3>
            <p>Score processes based on automation potential, business impact, and implementation complexity. Look for "quick wins"—high-impact processes that are relatively straightforward to automate.</p>
            
            <h3>Step 3: Pilot Project</h3>
            <p>Choose one process for a pilot. Set clear success metrics, implement incrementally, gather user feedback, and iterate. Document lessons learned for subsequent projects.</p>
            
            <h3>Step 4: Scale Systematically</h3>
            <p>Apply lessons from your pilot to additional processes. Build automation expertise within your organization and develop governance frameworks for responsible AI use.</p>
            
            <blockquote>The most successful automation initiatives start small, prove value quickly, and scale based on actual results rather than theoretical benefits.</blockquote>
            
            <h2>The Human Element</h2>
            <p>One common concern about automation is job displacement. In practice, well-implemented AI automation doesn't eliminate jobs—it transforms them. Employees spend less time on tedious, repetitive work and more time on activities requiring creativity, judgment, and human connection.</p>
            
            <p>The key is involving employees in the automation process from the start. They understand the work best, can identify automation opportunities, and can help design solutions that actually improve their workday rather than creating new frustrations.</p>
            
            <h2>Looking Ahead</h2>
            <p>AI automation capabilities continue to advance rapidly. What requires complex implementation today may be straightforward tomorrow. Organizations that develop automation expertise and build systematic approaches to identifying opportunities will have significant competitive advantages.</p>
            
            <p>The question isn't whether to automate with AI, but which processes to automate first and how to do so in a way that delivers measurable value while building capabilities for the future.</p>
        `
    },
    'reducing-search-time-90': {
        category: 'Case Study',
        date: 'Oct 2025',
        readTime: '5 min read',
        title: 'Reducing Search Time by 90% with AI Assistants',
        excerpt: 'A real-world case study showing how our Local LLM Assistant helped a Fortune 500 company dramatically reduce information retrieval time while maintaining complete data privacy and security.',
        content: `
            <h2>The Challenge</h2>
            <p>A Fortune 500 financial services company with 8,500 employees was struggling with a critical productivity problem that was hiding in plain sight: employees were spending an average of 12 hours per week—nearly one-third of their work time—searching for information across various systems, documents, and databases.</p>
            
            <p>The company's knowledge was scattered across multiple platforms:</p>
            <ul>
                <li>A legacy document management system with 15 years of accumulated files</li>
                <li>SharePoint sites organized by department with inconsistent structures</li>
                <li>Email archives containing crucial decisions and discussions</li>
                <li>CRM systems with customer history and communications</li>
                <li>Project management tools with specifications and requirements</li>
                <li>Compliance databases with regulatory documentation</li>
            </ul>
            
            <p>Each system had its own search functionality, but none could search across platforms. Finding comprehensive information on any topic required querying multiple systems, reviewing countless documents, and often asking colleagues who might remember where specific information lived.</p>
            
            <p>The VP of Operations described the situation: <em>"Our people spend more time looking for information than using it. We have brilliant analysts spending hours tracking down data that should be at their fingertips. It's like having a library with no card catalog—the information exists, but nobody can find it efficiently."</em></p>
            
            <h2>Why Traditional Solutions Fell Short</h2>
            <p>The company had tried various approaches to solve this problem:</p>
            
            <ul>
                <li><strong>Enterprise search tools</strong> that could index multiple systems but returned thousands of irrelevant results requiring manual filtering</li>
                <li><strong>Knowledge management initiatives</strong> that required employees to manually tag and categorize documents—a process that never kept pace with content creation</li>
                <li><strong>Consolidation projects</strong> to move everything to a single platform—which stalled due to the massive effort required and resistance from different departments</li>
            </ul>
            
            <p>None of these approaches addressed the fundamental issue: the need for intelligent understanding of context, content, and intent.</p>
            
            <h2>The Solution: Local LLM Assistant</h2>
            <p>After evaluating cloud-based AI options, the company chose our Local LLM Assistant for three critical reasons:</p>
            
            <ol>
                <li><strong>Data Privacy:</strong> As a regulated financial institution, keeping sensitive data on-premise was non-negotiable</li>
                <li><strong>Universal Integration:</strong> The ability to process and understand any document type or system</li>
                <li><strong>Contextual Understanding:</strong> AI that understands intent and provides relevant answers, not just keyword matches</li>
            </ol>
            
            <h3>Implementation Approach</h3>
            <p>We deployed the solution in three phases over 12 weeks:</p>
            
            <h4>Phase 1: Pilot Department (Weeks 1-4)</h4>
            <p>We started with the Risk Management department (150 employees) who were particularly affected by information fragmentation. The Local LLM Assistant was deployed on their existing server infrastructure and connected to their primary knowledge sources.</p>
            
            <h4>Phase 2: Refinement and Training (Weeks 5-8)</h4>
            <p>Based on user feedback, we refined search algorithms, adjusted relevance ranking, and provided training sessions. Users learned to ask natural language questions rather than keyword searches.</p>
            
            <h4>Phase 3: Enterprise Rollout (Weeks 9-12)</h4>
            <p>After demonstrating clear value in the pilot, we scaled to all departments, integrating additional data sources and customizing for different user groups.</p>
            
            <h3>Key Capabilities Implemented</h3>
            <ul>
                <li><strong>Universal Content Integration:</strong> Automatic indexing of documents across all systems, regardless of format</li>
                <li><strong>Intelligent Search:</strong> Natural language queries returning contextually relevant results with source citations</li>
                <li><strong>Automatic Summarization:</strong> Instant summaries of lengthy documents or entire projects</li>
                <li><strong>Relationship Mapping:</strong> Understanding connections between related information across different sources</li>
                <li><strong>Continuous Learning:</strong> Automatic updates as new content is created or modified</li>
            </ul>
            
            <h2>The Results</h2>
            <p>The impact exceeded initial expectations across multiple dimensions:</p>
            
            <h3>Time Savings</h3>
            <ul>
                <li><strong>90% reduction in search time</strong>—from 12 hours/week to 1.2 hours/week per employee</li>
                <li>Average query response time: <strong>under 3 seconds</strong> vs. 25+ minutes previously</li>
                <li>Information retrieval that previously required contacting 3-4 colleagues now happens instantly</li>
            </ul>
            
            <h3>Financial Impact</h3>
            <ul>
                <li><strong>$13.5 million annually in recovered productivity</strong> (calculated at average fully-loaded employee cost of $150K)</li>
                <li>ROI achieved in <strong>4.2 months</strong>, including all implementation costs</li>
                <li>Projected 5-year net benefit: <strong>$62 million</strong></li>
            </ul>
            
            <h3>Qualitative Improvements</h3>
            <ul>
                <li><strong>Employee satisfaction:</strong> Internal surveys showed 89% of users rated the assistant as "very valuable" or "essential"</li>
                <li><strong>Decision quality:</strong> Teams making decisions with more complete information due to easier access to relevant historical data</li>
                <li><strong>Onboarding speed:</strong> New employees becoming productive 40% faster due to self-service access to company knowledge</li>
                <li><strong>Compliance confidence:</strong> Easier access to regulatory documentation and precedents</li>
            </ul>
            
            <h2>User Testimonials</h2>
            <blockquote>"I used to spend my Monday mornings tracking down information from last week. Now I ask a question and get an instant answer with references. It's like having a colleague who has read and remembers everything the company has ever written."<br/>— Senior Financial Analyst</blockquote>
            
            <blockquote>"Before, finding the right compliance documentation meant asking around to see who might know where it was filed. Now I type a question and immediately get the relevant policies with the specific sections I need. It's transformative."<br/>— Compliance Manager</blockquote>
            
            <h2>Lessons Learned</h2>
            <p>Several insights emerged from this implementation that inform our approach with other clients:</p>
            
            <ol>
                <li><strong>User adoption is critical:</strong> Even the best technology fails without proper training and change management</li>
                <li><strong>Start focused, then expand:</strong> The pilot approach built credibility and allowed refinement before full deployment</li>
                <li><strong>Data privacy matters:</strong> Local deployment was essential for this regulated industry and became a competitive advantage</li>
                <li><strong>Measure everything:</strong> Clear metrics from day one justified the investment and guided optimization</li>
            </ol>
            
            <h2>Broader Applications</h2>
            <p>While this case study focuses on a financial services company, the fundamental challenge—information scattered across multiple systems—is nearly universal. We've seen similar results in:</p>
            
            <ul>
                <li>Healthcare organizations searching clinical literature and patient records</li>
                <li>Law firms researching precedents and case files</li>
                <li>Manufacturing companies accessing technical specifications and procedures</li>
                <li>Professional services firms leveraging historical project knowledge</li>
            </ul>
            
            <p>The common thread: organizations with valuable information trapped in silos, consuming excessive time and limiting productivity. Local LLM Assistants unlock that information, transforming it from a cost center into a strategic asset.</p>
            
            <h2>Your Organization's Opportunity</h2>
            <p>How much time do your employees spend searching for information? Even if it's half the 12 hours this company experienced, the productivity gains and cost savings from AI-powered intelligent search can be substantial.</p>
            
            <p>At KWForce, we specialize in deploying Local LLM Assistants that deliver measurable results while maintaining complete data privacy. Let's discuss how we can help your organization unlock the value trapped in your information systems.</p>
        `
    },
    '2026-ai-trends': {
        category: 'Trends',
        date: 'Sep 2025',
        readTime: '9 min read',
        title: '2026 AI Trends Every Business Leader Should Know',
        excerpt: 'Stay ahead of the curve with our analysis of emerging AI trends for 2026. From multimodal AI to edge computing, understand what\'s coming and how to prepare your organization.',
        content: `
            <h2>The AI Landscape in 2026</h2>
            <p>As we approach 2026, artificial intelligence continues to evolve at a remarkable pace. Understanding emerging trends is essential for business leaders who want to maintain competitive advantage and capitalize on new opportunities. The AI landscape is shifting from experimental deployments to strategic enterprise infrastructure—and the organizations that understand these trends will be best positioned to benefit.</p>
            
            <p>Based on our work with hundreds of enterprises and analysis of industry developments, here are the seven most significant AI trends that will shape business operations in 2026.</p>
            
            <h2>1. Multimodal AI Systems</h2>
            <p>The next generation of AI doesn't just process text—it understands the world through multiple senses simultaneously. Multimodal AI can process and understand multiple types of input—text, images, audio, video, and sensor data—creating richer context and more accurate insights than single-modality systems.</p>
            
            <h3>Why This Matters</h3>
            <p>Most business information doesn't exist in a single format. A product development process might involve design sketches, specification documents, verbal discussions, and performance data. Multimodal AI can understand all of these simultaneously, connecting insights across formats in ways that were previously impossible.</p>
            
            <h3>Business Applications</h3>
            <ul>
                <li><strong>Quality Control:</strong> Combining visual inspection with sensor data and documentation to detect manufacturing defects</li>
                <li><strong>Customer Service:</strong> Understanding customer issues from descriptions, photos, and purchase history simultaneously</li>
                <li><strong>Content Creation:</strong> Generating marketing materials that coordinate text, images, and brand guidelines</li>
                <li><strong>Medical Diagnosis:</strong> Analyzing patient symptoms (text), medical images, and sensor data together</li>
            </ul>
            
            <h2>2. Edge AI and Distributed Intelligence</h2>
            <p>Processing AI workloads on devices at the "edge" of the network—smartphones, IoT sensors, vehicles, factory equipment—addresses critical limitations of cloud-based AI including latency, privacy, bandwidth costs, and reliability.</p>
            
            <h3>The Shift to Edge</h3>
            <p>As AI models become more efficient and edge devices more powerful, processing is moving closer to where data originates. This isn't replacing cloud AI—it's creating hybrid architectures that leverage both cloud and edge processing strategically.</p>
            
            <h3>Business Benefits</h3>
            <ul>
                <li><strong>Real-time responsiveness:</strong> Millisecond decisions without cloud latency</li>
                <li><strong>Privacy protection:</strong> Sensitive data processed locally without cloud transmission</li>
                <li><strong>Reduced bandwidth costs:</strong> Processing at the edge means less data transfer</li>
                <li><strong>Offline operation:</strong> AI functionality continues even without internet connectivity</li>
            </ul>
            
            <h3>Industry Applications</h3>
            <p>Autonomous vehicles making split-second decisions, manufacturing equipment detecting quality issues in real-time, retail systems analyzing customer behavior locally, and healthcare devices monitoring patients continuously—all powered by edge AI.</p>
            
            <h2>3. AI Agents and Autonomous Workflows</h2>
            <p>Beyond answering questions or providing recommendations, AI agents can now execute complex multi-step workflows autonomously. These systems understand goals, plan action sequences, use tools, and adapt to changing circumstances—all with minimal human intervention.</p>
            
            <h3>From Assistance to Autonomy</h3>
            <p>Early AI acted as a helpful assistant—you asked a question, it provided an answer. AI agents in 2026 take initiative: "You want to optimize inventory levels? I'll analyze current stock, predict demand, evaluate supplier lead times, calculate optimal reorder points, and generate purchase orders for your approval."</p>
            
            <h3>Practical Applications</h3>
            <ul>
                <li><strong>Customer onboarding:</strong> AI agents managing entire onboarding workflows from document collection through account setup</li>
                <li><strong>Financial analysis:</strong> Autonomous agents conducting research, analyzing data, and producing investment recommendations</li>
                <li><strong>IT operations:</strong> Self-healing systems that detect, diagnose, and resolve technical issues automatically</li>
                <li><strong>Supply chain management:</strong> AI agents optimizing procurement, logistics, and inventory across complex networks</li>
            </ul>
            
            <h2>4. Small Language Models and Efficiency</h2>
            <p>While headlines focus on ever-larger AI models, a counter-trend is gaining momentum: highly efficient small language models (SLMs) that deliver impressive results with a fraction of the computational requirements.</p>
            
            <h3>The Case for Small Models</h3>
            <p>Larger models aren't always better for business applications. Small, specialized models often provide superior performance for specific tasks while consuming less energy, requiring less infrastructure, and running faster than their massive counterparts.</p>
            
            <h3>Strategic Advantages</h3>
            <ul>
                <li><strong>Cost efficiency:</strong> 10-100x lower operational costs than large models</li>
                <li><strong>Speed:</strong> Faster response times enable real-time applications</li>
                <li><strong>Deployment flexibility:</strong> Can run on modest hardware or edge devices</li>
                <li><strong>Environmental impact:</strong> Significantly lower energy consumption</li>
            </ul>
            
            <h2>5. AI for Cybersecurity (and AI Attacks)</h2>
            <p>AI is becoming both the best defense against cyber threats and, unfortunately, a powerful tool for attackers. Understanding both sides of this equation is critical for 2026.</p>
            
            <h3>AI-Powered Defense</h3>
            <p>AI security systems detect anomalies, predict attacks, respond to threats in real-time, and continuously adapt to new attack patterns. They can identify sophisticated threats that bypass traditional security tools.</p>
            
            <h3>AI-Powered Attacks</h3>
            <p>Attackers are using AI to craft convincing phishing campaigns, identify vulnerabilities, automate attacks, and evade detection systems. The sophistication of AI-powered attacks is escalating rapidly.</p>
            
            <h3>What This Means for Business</h3>
            <p>Cybersecurity is becoming an AI arms race. Organizations relying on traditional security tools face increasing risk from AI-powered attacks. Investment in AI-powered defense is transitioning from optional to essential.</p>
            
            <h2>6. Regulation and AI Governance</h2>
            <p>2026 brings increasing regulatory oversight of AI systems. The EU's AI Act, various national regulations, and industry-specific guidelines are creating complex compliance requirements that businesses must navigate.</p>
            
            <h3>Key Regulatory Themes</h3>
            <ul>
                <li><strong>Transparency:</strong> Requirements to explain AI decisions and disclose AI use</li>
                <li><strong>Bias and fairness:</strong> Mandates to test for and mitigate discriminatory outcomes</li>
                <li><strong>Privacy:</strong> Strict rules around AI's use of personal data</li>
                <li><strong>Accountability:</strong> Clear responsibility for AI system failures or harms</li>
            </ul>
            
            <h3>Proactive Governance</h3>
            <p>Forward-thinking organizations are establishing AI governance frameworks before regulation forces them to. This includes ethical guidelines, bias testing protocols, transparency documentation, and oversight committees.</p>
            
            <h2>7. Human-AI Collaboration Models</h2>
            <p>The most successful organizations in 2026 aren't replacing humans with AI—they're developing sophisticated collaboration models where humans and AI complement each other's strengths.</p>
            
            <h3>Augmentation, Not Replacement</h3>
            <p>AI handles data processing, pattern recognition, and routine decisions. Humans provide creativity, emotional intelligence, ethical judgment, and strategic thinking. The combination delivers results neither could achieve alone.</p>
            
            <h3>New Skill Requirements</h3>
            <p>As AI handles more routine work, distinctly human skills become more valuable: critical thinking, creativity, emotional intelligence, ethical reasoning, and the ability to ask the right questions of AI systems.</p>
            
            <h3>Organizational Implications</h3>
            <p>Companies are redesigning roles, developing new training programs, and creating career paths that leverage human-AI collaboration. The most valuable employees in 2026 know how to work effectively with AI tools to amplify their capabilities.</p>
            
            <h2>Preparing Your Organization</h2>
            <p>Understanding trends is valuable only if you act on them. Here's how to prepare your organization for the AI landscape of 2026:</p>
            
            <h3>1. Develop an AI Strategy</h3>
            <p>Create a 3-year AI roadmap aligned with business goals. Identify high-impact opportunities, assess current capabilities and gaps, and establish clear priorities for investment and development.</p>
            
            <h3>2. Build AI Literacy</h3>
            <p>Ensure leadership understands AI capabilities, limitations, and business implications. Develop organization-wide AI literacy so employees can identify opportunities and work effectively with AI tools.</p>
            
            <h3>3. Establish Governance Early</h3>
            <p>Don't wait for regulations to force governance. Establish ethical guidelines, bias testing protocols, and oversight mechanisms now. Organizations with mature governance frameworks adapt more quickly to regulatory requirements.</p>
            
            <h3>4. Invest in Infrastructure</h3>
            <p>AI success requires quality data, appropriate computing resources, and robust security. Assess your infrastructure gaps and invest strategically to support AI initiatives.</p>
            
            <h3>5. Develop Talent and Partnerships</h3>
            <p>Build internal AI expertise while partnering with specialists for advanced capabilities. Create career paths that attract and retain AI talent. Develop training programs to help existing employees work effectively with AI.</p>
            
            <h3>6. Start with Focused Pilots</h3>
            <p>Don't attempt to transform everything simultaneously. Choose focused pilot projects that can demonstrate value, build organizational confidence, and provide learning opportunities.</p>
            
            <blockquote>The organizations that lead in 2026 won't necessarily be the ones with the most advanced AI—they'll be the ones that most effectively integrate AI into their business strategy and operations.</blockquote>
            
            <h2>Looking Further Ahead</h2>
            <p>These trends represent the near-term AI landscape, but the pace of change continues to accelerate. Organizations that build adaptable AI strategies, invest in continuous learning, and maintain strategic flexibility will be best positioned not just for 2026, but for the transformations that follow.</p>
            
            <p>At KWForce, we help businesses navigate the evolving AI landscape with strategic planning, implementation support, and ongoing guidance. Let's discuss how these trends might impact your organization and how to position yourself for success.</p>
        `
    }
};

// Show article function (global - defined early)
window.showArticle = function(articleId) {
    const article = window.blogArticles[articleId];
    if (!article) {
        console.log('Article not found:', articleId);
        return;
    }
    
    console.log('Showing article:', articleId);
    
    const articleView = document.getElementById('blogArticleView');
    const articleContent = document.getElementById('articleContent');
    const blogSection = document.querySelector('[data-section="3"]');
    
    if (!articleView || !articleContent) {
        console.log('Article view elements not found');
        return;
    }
    
    // Build article HTML
    const articleHTML = `
        <div class="article-header">
            <div class="article-meta">
                <span class="article-category">${article.category}</span>
                <span class="article-date">${article.date}</span>
                <span class="article-read-time">⏱️ ${article.readTime}</span>
            </div>
            <h1 class="article-title">${article.title}</h1>
            <p class="article-excerpt">${article.excerpt}</p>
        </div>
        <div class="article-body">
            ${article.content}
        </div>
    `;
    
    articleContent.innerHTML = articleHTML;
    
    // Hide blog section, show article view
    if (blogSection) blogSection.style.display = 'none';
    articleView.style.display = 'block';
    
    // Scroll removed
    
    // Update URL
    const newURL = `/blog/${articleId}`;
    if (window.location.pathname !== newURL) {
        history.pushState({ article: articleId }, '', newURL);
    }
    
    console.log('Article displayed:', articleId);
};
END REMOVED BLOG/FAQ CODE */

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check URL first to set initial target section
    checkInitialURL();
    
    // Check current page path
    const pathname = window.location.pathname;
    const isHomePage = pathname === '/' || pathname === '/index.html';
    const introShown = sessionStorage.getItem('kwforce_intro_shown');
    const willShowAnimation = isHomePage && !introShown;
    
    // Scroll configuration removed - will be reimplemented later
    const wrapper = document.getElementById('horizontalWrapper');
    if (!isHomePage && !wrapper) {
        document.body.classList.add('is-multi-page');
        document.documentElement.classList.add('is-multi-page');
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.style.opacity = '1';
            mainContent.style.visibility = 'visible';
            mainContent.style.pointerEvents = 'auto';
        }
        const introSequence = document.getElementById('introSequence');
        if (introSequence) {
            introSequence.style.display = 'none';
            introSequence.style.pointerEvents = 'none';
            introSequence.style.opacity = '0';
        }
    }
    
    if (!isHomePage) {
        document.body.classList.remove('is-home-loading');
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.style.opacity = '1';
            mainContent.style.visibility = 'visible';
            mainContent.classList.add('show');
            mainContent.style.pointerEvents = 'auto';
        }
        const introSequence = document.getElementById('introSequence');
        if (introSequence) {
            introSequence.style.display = 'none';
            introSequence.style.pointerEvents = 'none';
            introSequence.style.opacity = '0';
        }
    } else if (willShowAnimation) {
        document.body.classList.add('is-home-loading');
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.style.opacity = '0';
            mainContent.style.visibility = 'hidden';
            mainContent.style.pointerEvents = 'none';
        }
    } else {
        document.body.classList.remove('is-home-loading');
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.style.opacity = '1';
            mainContent.style.visibility = 'visible';
            mainContent.style.pointerEvents = 'auto';
        }
    }
    
    detectMobileDevice();
    initializeIntroSequence();
    initializeNavigation();
    initializeEmailJS();
    initializeContactForm();
    initializeFloatingNavigation();
    initializeMobileOptimizations();
    initializeBrowserNavigation();
    
    // Initialize comprehensive responsive design system
    initializeResponsiveDesign();
    adjustResponsiveLayout();
    
    // Scroll configuration removed - will be reimplemented later
    
    // Optimize image when it loads
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.addEventListener('load', function() {
            if (isMobileDevice) {
                setTimeout(() => {
                    optimizeImageForScreenSize();
                }, 100);
            }
        });
        
        // Also optimize if image is already loaded
        if (heroImage.complete) {
            setTimeout(() => {
                if (isMobileDevice) {
                    optimizeImageForScreenSize();
                }
            }, 100);
        }
    }
});

// Scroll configuration removed - will be reimplemented later

// Scroll configuration removed - will be reimplemented later

// Mobile Device Detection
function detectMobileDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    const isSmallScreen = window.innerWidth <= 768;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    const wasMobile = isMobileDevice;
    isMobileDevice = isMobile || (isSmallScreen && isTouchDevice);
    
    // Add/remove mobile class to body
    if (isMobileDevice) {
        document.body.classList.add('mobile-device');
    } else {
        document.body.classList.remove('mobile-device');
    }
    
    // If device type changed, reinitialize navigation
    if (wasMobile !== isMobileDevice && loadingComplete) {
        reinitializeNavigation();
    }
}

// Reinitialize navigation when switching between mobile/desktop
function reinitializeNavigation() {
    const wrapper = document.getElementById('horizontalWrapper');
    if (!wrapper) return;
    
    // Reset position based on current device type
    if (isMobileDevice) {
        const translateY = -currentSection * 100;
        wrapper.style.transform = `translateY(${translateY}vh)`;
    } else {
        const translateX = -currentSection * 100;
        wrapper.style.transform = `translateX(${translateX}vw)`;
        
        // Close mobile menu if it was open
        if (mobileMenuOpen) {
            closeMobileMenu();
        }
    }
}

// Handle window resize and orientation change
window.addEventListener('resize', function() {
    detectMobileDevice();
    // Add debouncing for better performance
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => {
        optimizeImageForScreenSize();
        // Update responsive design system
        initializeResponsiveDesign();
        adjustResponsiveLayout();
    }, 250);
});

// Handle orientation change specifically for mobile
window.addEventListener('orientationchange', function() {
    // Wait for orientation change to complete
    setTimeout(() => {
        detectMobileDevice();
        optimizeImageForScreenSize();
        
        // Update responsive design system
        initializeResponsiveDesign();
        adjustResponsiveLayout();
        
        // Additional optimization for orientation change
        if (isMobileDevice) {
            const heroImage = document.querySelector('.hero-image');
            const heroImageContainer = document.querySelector('.hero-image-container');
            
            if (heroImage && heroImageContainer) {
                // Force reflow and reoptimization
                heroImage.style.display = 'none';
                heroImage.offsetHeight; // Force reflow
                heroImage.style.display = '';
                
                setTimeout(() => {
                    optimizeImageForScreenSize();
                }, 50);
            }
        }
    }, 100);
});

// Intro Sequence
function initializeIntroSequence() {
    const introSequence = document.getElementById('introSequence');
    const mainContent = document.getElementById('mainContent');
    
    // Check current page path
    const pathname = window.location.pathname;
    const isHomePage = pathname === '/' || pathname === '/index.html';
    
    // For non-home pages (about, solutions, contact), always skip intro and show content immediately
    if (!isHomePage) {
        if (introSequence) {
            introSequence.style.display = 'none';
        }

        if (mainContent) {
            mainContent.classList.add('show');
            mainContent.style.opacity = '1';
        }
        
        loadingComplete = true;
        currentSection = initialTargetSection;
        
        // Scroll configuration removed
        if (mainContent) {
        }

        setTimeout(() => {
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach((item, index) => {
                item.classList.toggle('active', index === initialTargetSection);
            });
        }, 10);

        return;
    }

    // Home page: check if we should show intro animation
    // Only show intro animation on first visit
    const introShown = sessionStorage.getItem('kwforce_intro_shown');
    const shouldShowIntro = !introShown;

    if (!shouldShowIntro) {
        // Skip intro: already shown
        if (introSequence) {
            introSequence.style.display = 'none';
        }

        if (mainContent) {
            mainContent.classList.add('show');
            mainContent.style.opacity = '1';
            mainContent.style.visibility = 'visible';
            }
            
        // Scroll configuration removed
        document.body.classList.remove('is-home-loading');

        loadingComplete = true;
        currentSection = 0;
        
        return;
                }
    
    // Normal intro animation (only for home page, first visit)
        if (introSequence) {
        // Hide main content completely during animation
        if (mainContent) {
            mainContent.style.opacity = '0';
            mainContent.style.visibility = 'hidden';
            mainContent.style.pointerEvents = 'none';
        }
        
        // Scroll configuration removed
        
        introSequence.classList.add('active');
        
        setTimeout(() => {
            introSequence.classList.add('fade-out');

            setTimeout(() => {
                // Smooth transition: fade out intro, then show content
                introSequence.style.opacity = '0';
                introSequence.style.pointerEvents = 'none';
                
                // Scroll configuration removed
                
            if (mainContent) {
                    // Show main content smoothly
                    mainContent.style.visibility = 'visible';
                    mainContent.style.pointerEvents = 'auto';
                mainContent.classList.add('show');
                    // Fade in main content smoothly
                    setTimeout(() => {
                        mainContent.style.transition = 'opacity 0.8s ease-in-out';
                        mainContent.style.opacity = '1';
                    }, 50);
            }
                document.body.classList.remove('is-home-loading');

            loadingComplete = true;
                sessionStorage.setItem('kwforce_intro_shown', 'true');
                
                // Hide intro sequence after fade-out completes
                setTimeout(() => {
                    introSequence.style.display = 'none';
        }, 1000);

            }, 2500);
        }, 2200);
    } else {
        loadingComplete = true;
    }
}

// Navigation System
function initializeNavigation() {
    const wrapper = document.getElementById('horizontalWrapper');
    const navItems = document.querySelectorAll('.nav-item');
    const navCta = document.querySelector('.nav-cta');
    
    // Check if this is a multi-page setup (no horizontalWrapper)
    const isMultiPage = !wrapper;
    
    // For multi-page setup, update active nav item based on current URL
    if (isMultiPage) {
        const currentPath = window.location.pathname;
        navItems.forEach((item) => {
            const href = item.getAttribute('href');
            // Remove active class from all items first
            item.classList.remove('active');
            // Add active class if href matches current path
            // Normalize paths: remove trailing slashes and handle root
            const normalizedHref = href === '/' ? '/' : href.replace(/\/$/, '');
            const normalizedPath = currentPath === '/' ? '/' : currentPath.replace(/\/$/, '');
            if (normalizedHref === normalizedPath) {
                item.classList.add('active');
            }
        });
    }
    
    // Function to update URL based on section
    function updateURLForSection(sectionIndex) {
        let url = '/';
        switch(sectionIndex) {
            case 0:
                url = '/';
                break;
            case 1:
                url = '/about';
                break;
            case 2:
                url = '/solutions';
                break;
            case 3:
                url = '/contact';
                break;
        }
        
        // Update URL without reloading the page
        // Only push state if URL is different
        const currentPath = window.location.pathname;
        
        // Don't change URL if already at the target path (maintain SEO-friendly URLs)
        if (currentPath === url) {
            console.log('URL already correct, maintaining:', url);
            return;
        }
        
        // Special case: maintain SEO-friendly URLs
        if ((currentPath === '/about' && sectionIndex === 1) || 
            (currentPath === '/contact' && sectionIndex === 2)) {
            console.log('Maintaining current URL for SEO:', currentPath);
            return;
        }
        
        console.log('Updating URL from', currentPath, 'to', url);
        history.pushState({ section: sectionIndex }, '', url);
    }
    
// Wheel scroll navigation removed - multipage setup uses normal vertical scrolling
    
    // Keyboard navigation (only for single-page setup)
    if (!isMultiPage) {
        document.addEventListener('keydown', function(e) {
            // Don't navigate if article is open
            const articleView = document.getElementById('blogArticleView');
            if (articleView && articleView.style.display === 'block') return;
            
            if (isTransitioning || !loadingComplete) return;
            
            switch(e.key) {
                case 'ArrowRight':
                case ' ':
                    if (currentSection < totalSections - 1) {
                        e.preventDefault();
                        navigateToSection(currentSection + 1);
                    }
                    break;
                case 'ArrowLeft':
                    if (currentSection > 0) {
                        e.preventDefault();
                        navigateToSection(currentSection - 1);
                    }
                    break;
            }
        });
    }
    
    // Navigation items
    navItems.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            // For multi-page setup, allow normal navigation
            if (isMultiPage) {
                // Let the browser handle normal page navigation
                return;
            }
            
            // For single-page setup, prevent default and use SPA navigation
            e.preventDefault();
            
            if (!isTransitioning && loadingComplete) {
                const sectionIndex = parseInt(this.getAttribute('data-section')) || index;
                goToSection(sectionIndex);
            }
        });
    });
    
    // CTA button - go to contact form (Get Consultation)
    if (navCta) {
        navCta.addEventListener('click', function(e) {
            // For multi-page setup, allow normal navigation
            if (isMultiPage) {
                // Let the browser handle normal page navigation
                return;
            }
            
            // For single-page setup, prevent default and use SPA navigation
            e.preventDefault();
            console.log('Nav CTA clicked, isMobileDevice:', isMobileDevice);
            goToSection(2); // Contact section (index 2) - goes to form
        });
    }
    
    // All other CTA buttons
    const ctaButtons = document.querySelectorAll('.btn-primary:not(.submit-btn)');
    const secondaryButtons = document.querySelectorAll('.btn-secondary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // For multi-page setup, allow normal navigation (buttons should have href attributes)
            if (isMultiPage) {
                // Let the browser handle normal page navigation
                return;
            }
            
            // For single-page setup, prevent default and use SPA navigation
            e.preventDefault();
            console.log('Primary button clicked, isMobileDevice:', isMobileDevice);
            goToSection(2); // Contact section
        });
    });
    
    secondaryButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // For multi-page setup, allow normal navigation (buttons should have href attributes)
            if (isMultiPage) {
                // Let the browser handle normal page navigation
                return;
            }
            
            // For single-page setup, prevent default and use SPA navigation
            e.preventDefault();
            console.log('Secondary button clicked:', this.textContent, 'isMobileDevice:', isMobileDevice);
            if (this.textContent.includes('Learn More')) {
                goToSection(1); // About section
            } else {
                goToSection(2); // Contact section
            }
        });
    });
    
    function navigateToSection(sectionIndex) {
        if (sectionIndex === currentSection || isTransitioning) return;
        
        isTransitioning = true;
        const previousSection = currentSection;
        currentSection = sectionIndex;
        
        // Update URL
        updateURLForSection(sectionIndex);
        
        // Update wrapper position - adaptive for mobile/desktop
        if (isMobileDevice) {
            // On mobile, just scroll to the section smoothly
            const sections = document.querySelectorAll('.h-section');
            if (sections[sectionIndex]) {
                const targetSection = sections[sectionIndex];
                const offsetTop = targetSection.offsetTop;
                
                document.querySelector('.main-content').scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        } else {
            // Desktop: Smooth horizontal transition with better performance
            const translateX = -sectionIndex * 100;
            
            // Reset any section scroll positions to prevent "drop" effect
            const sections = document.querySelectorAll('.h-section');
            sections.forEach((section, index) => {
                if (index !== sectionIndex) {
                    // Smoothly reset scroll position to prevent jarring jumps
                    if (section.scrollTop > 0) {
                        section.style.scrollBehavior = 'auto';
                        section.scrollTop = 0;
                        // Restore smooth scrolling after reset
                        setTimeout(() => {
                            section.style.scrollBehavior = 'smooth';
                        }, 50);
                    }
                }
            });
            
            // Apply transform with improved transition
            wrapper.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            wrapper.style.transform = `translateX(${translateX}vw)`;
            
            // Ensure transform is applied
            wrapper.offsetHeight; // Force reflow
        }
        
        // Update navigation
        navItems.forEach((item, index) => {
            item.classList.toggle('active', index === sectionIndex);
        });
        
        // Update mobile indicators
        const indicators = document.querySelectorAll('.nav-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === sectionIndex);
        });
        
        // Hide scroll hint when reaching contact section (section 2) in mobile
        if (isMobileDevice && sectionIndex === 2) {
            document.body.classList.add('at-contact-section');
        } else if (isMobileDevice) {
            document.body.classList.remove('at-contact-section');
        }
        
        // Reset transition flag with proper timing
        setTimeout(() => {
            isTransitioning = false;
            
            // Clear transition property to allow normal scrolling within sections
            if (!isMobileDevice) {
                wrapper.style.transition = '';
            }
        }, 850);
    }
    
    // Unified navigation function
    function goToSection(sectionIndex) {
        console.log('goToSection called:', sectionIndex, 'isMobileDevice:', isMobileDevice);
        
        if (isMobileDevice) {
            // Update URL for mobile
            updateURLForSection(sectionIndex);
            
            // On mobile, scroll to the section smoothly
            currentSection = sectionIndex;
            
            // Update navigation indicators
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach((item, index) => {
                item.classList.toggle('active', index === sectionIndex);
            });
            
            // Scroll to section on mobile
            scrollToSectionMobile(sectionIndex);
        } else {
            // For desktop, navigateToSection will handle URL update
            navigateToSection(sectionIndex);
        }
    }
    
    // Function to scroll to sections on mobile (only for single-page setup)
    function scrollToSectionMobile(sectionIndex) {
        const wrapper = document.getElementById('horizontalWrapper');
        // Only scroll if this is a single-page setup
        if (!wrapper) return;
        
        const sections = document.querySelectorAll('.h-section');
        const mainContent = document.querySelector('.main-content');
        
        if (sections[sectionIndex] && mainContent) {
            const targetSection = sections[sectionIndex];
            const offsetTop = targetSection.offsetTop;
            
            console.log('Scrolling to section', sectionIndex, 'offsetTop:', offsetTop);
            
            // Smooth scroll to section with offset for better positioning
            const scrollOffset = offsetTop - 20; // Small offset for better view
            
            mainContent.scrollTo({
                top: Math.max(0, scrollOffset),
                behavior: 'smooth'
            });
        }
    }
    
    // Expose navigate functions globally
    window.navigateToSection = navigateToSection;
    window.goToSection = goToSection;
    window.updateURLForSection = updateURLForSection;
}

// Check initial URL and navigate to correct section
function checkInitialURL() {
    const pathname = window.location.pathname;
    
    console.log('Checking initial URL:', pathname);
    
    // Determine target section based on URL
    if (pathname === '/about') {
        initialTargetSection = 1;
    } else if (pathname === '/solutions') {
        initialTargetSection = 2;
    } else if (pathname === '/contact') {
        initialTargetSection = 3;
    } else {
        initialTargetSection = 0; // Home
    }
    
    console.log('Initial target section set to:', initialTargetSection);
}

// Browser Navigation (Back/Forward buttons)
function initializeBrowserNavigation() {
    // Set initial state if not set
    if (!history.state) {
        const pathname = window.location.pathname;
        let section = 0;
        if (pathname === '/about') {
            section = 1;
        } else if (pathname === '/solutions') {
            section = 2;
        } else if (pathname === '/contact') {
            section = 3;
        }
        history.replaceState({ section: section }, '', pathname);
    }
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(event) {
        console.log('Popstate event triggered:', event.state, window.location.pathname);
        
        // Determine which section to navigate to based on URL
        let targetSection = 0;
        const pathname = window.location.pathname;
        
        if (pathname === '/') {
            targetSection = 0;
        } else if (pathname === '/about') {
            targetSection = 1;
        } else if (pathname === '/solutions') {
            targetSection = 2;
        } else if (pathname === '/contact') {
            targetSection = 3;
        }
        
        console.log('Navigating to section:', targetSection, 'from URL:', pathname);
        
        // Navigate to the section without adding to history
        if (event.state && event.state.section !== undefined) {
            targetSection = event.state.section;
        }
        
        // Navigate directly without updating URL again
        navigateToSectionWithoutHistory(targetSection);
    });
    
    // Function to navigate without updating history (for popstate)
    function navigateToSectionWithoutHistory(sectionIndex) {
        console.log('navigateToSectionWithoutHistory called:', sectionIndex);
        
        if (sectionIndex === currentSection) {
            console.log('Already at section', sectionIndex);
            return;
        }
        
        currentSection = sectionIndex;
        
        if (isMobileDevice) {
            // Mobile navigation
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach((item, index) => {
                item.classList.toggle('active', index === sectionIndex);
            });
            
            const sections = document.querySelectorAll('.h-section');
            const mainContent = document.querySelector('.main-content');
            
            if (sections[sectionIndex] && mainContent) {
                const targetSection = sections[sectionIndex];
                const offsetTop = targetSection.offsetTop;
                const scrollOffset = offsetTop - 20;
                
                mainContent.scrollTo({
                    top: Math.max(0, scrollOffset),
                    behavior: 'smooth'
                });
            }
        } else {
            // Desktop navigation
            const wrapper = document.getElementById('horizontalWrapper');
            const navItems = document.querySelectorAll('.nav-item');
            
            if (wrapper) {
                const translateX = -sectionIndex * 100;
                wrapper.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                wrapper.style.transform = `translateX(${translateX}vw)`;
                
                setTimeout(() => {
                    wrapper.style.transition = '';
                }, 850);
            }
            
            // Update navigation
            navItems.forEach((item, index) => {
                item.classList.toggle('active', index === sectionIndex);
            });
        }
        
        // Update mobile indicators
        const indicators = document.querySelectorAll('.nav-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === sectionIndex);
        });
    }
    
    // Expose function globally
    window.navigateToSectionWithoutHistory = navigateToSectionWithoutHistory;
}

// EmailJS Configuration
const EMAILJS_CONFIG = {
    serviceID: 'service_kwforce',
    templateID: 'template_contact',
    publicKey: 'YOUR_PUBLIC_KEY' // Will be configured with real keys
};

// Initialize EmailJS
function initializeEmailJS() {
    // Initialize EmailJS with public key
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
    }
}

// Contact Form Handler with EmailJS
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        // Set custom validation messages in English
        setCustomValidationMessages(form);
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            const originalBg = submitBtn.style.background;
            
            // Show loading state
            submitBtn.textContent = '⏳ Sending...';
            submitBtn.style.background = '#6366f1';
            submitBtn.disabled = true;
            
            const formData = new FormData(this);
            const data = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                company: formData.get('company'),
                message: formData.get('message')
            };
            
            // Prepare email parameters for EmailJS template
            const emailParams = {
                to_email: 'sales@kwforce.com',
                from_name: `${data.firstName} ${data.lastName}`,
                from_email: data.email,
                company: data.company,
                phone: data.phone || 'Not provided',
                message: data.message || 'No specific message provided',
                subject: `AI Consultation Request - ${data.company}`
            };
            
            // Try EmailJS first, fallback to mailto if it fails
            if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
                // Send email using EmailJS
                emailjs.send(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateID, emailParams)
                    .then(function(response) {
                        console.log('✅ Email sent successfully:', response);
                        showFormSuccess('✅ Message sent successfully!', '#059669');
                        form.reset();
                    })
                    .catch(function(error) {
                        console.error('❌ EmailJS failed:', error);
                        fallbackToMailto(data);
                        showFormSuccess('📧 Opening email client...', '#f59e0b');
                    })
                    .finally(function() {
                        setTimeout(() => {
                            submitBtn.textContent = originalText;
                            submitBtn.style.background = originalBg;
                            submitBtn.disabled = false;
                        }, 3000);
                    });
            } else {
                // Fallback to mailto immediately if EmailJS not configured
                console.log('📧 Using mailto fallback (EmailJS not configured)');
                fallbackToMailto(data);
                showFormSuccess('📧 Opening email client...', '#f59e0b');
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = originalBg;
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    }
}

// Fallback to mailto if EmailJS fails or isn't configured
function fallbackToMailto(data) {
    const emailBody = `
NEW ENTERPRISE INQUIRY - KWForce AI Solutions

CONTACT INFORMATION:
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Company: ${data.company}

MESSAGE:
${data.message || 'No specific message provided'}

---
This inquiry was submitted through the KWForce website.
    `.trim();
    
    const subject = `AI Consultation Request - ${data.company}`;
    const mailtoLink = `mailto:sales@kwforce.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    window.open(mailtoLink, '_blank');
}

function showFormSuccess(message = '✅ Message sent successfully!', color = '#059669') {
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.textContent = message;
        submitBtn.style.background = color;
        submitBtn.disabled = true;
    }
}

// Set custom validation messages in English
function setCustomValidationMessages(form) {
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Set custom validation messages
        input.addEventListener('invalid', function(e) {
            e.preventDefault();
            
            const field = this;
            let message = '';
            
            if (field.validity.valueMissing) {
                switch(field.name) {
                    case 'firstName':
                        message = 'Please enter your first name.';
                        break;
                    case 'lastName':
                        message = 'Please enter your last name.';
                        break;
                    case 'email':
                        message = 'Please enter your email address.';
                        break;
                    case 'company':
                        message = 'Please enter your company name.';
                        break;
                    case 'message':
                        message = 'Please tell us about your project.';
                        break;
                    default:
                        message = 'Please fill out this field.';
                }
            } else if (field.validity.typeMismatch && field.type === 'email') {
                message = 'Please enter a valid email address.';
            } else if (field.validity.tooShort) {
                message = `Please enter at least ${field.minLength} characters.`;
            } else if (field.validity.tooLong) {
                message = `Please enter no more than ${field.maxLength} characters.`;
            }
            
            field.setCustomValidity(message);
        });
        
        // Clear custom message when user starts typing
        input.addEventListener('input', function() {
            this.setCustomValidity('');
        });
        
        // Also clear on focus to ensure clean state
        input.addEventListener('focus', function() {
            this.setCustomValidity('');
        });
    });
}

// Floating Navigation
function initializeFloatingNavigation() {
    const floatingNavElements = document.querySelectorAll('.floating-nav');
    
    floatingNavElements.forEach(element => {
        element.addEventListener('click', function(e) {
            const targetSection = this.getAttribute('data-nav');
            let sectionIndex = 0;
            
            switch(targetSection) {
                case 'home':
                    sectionIndex = 0;
                    break;
                case 'about':
                    sectionIndex = 1;
                    break;
                case 'contact':
                    sectionIndex = 2;
                    break;
            }
            
            // Use goToSection which handles URL updates
            goToSection(sectionIndex);
            
            // Add a subtle click effect
            this.style.transform = 'scale(1.6)';
            this.style.filter = 'brightness(1.5) drop-shadow(0 0 30px rgba(240, 132, 29, 1))';
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.filter = '';
            }, 200);
        });
        
        // Add subtle glow effect on hover
        element.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 25px rgba(240, 132, 29, 0.8)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

// Mobile Optimizations
function initializeMobileOptimizations() {
    if (!isMobileDevice) return;
    
    // Remove section-based navigation for mobile - just use natural scroll
    removeMobileSectionNavigation();
    
    // Hide floating navigation elements on mobile
    hideFloatingNavigationOnMobile();
    
    // Add mobile-specific styles
    addMobileStyles();
    
    // Optimize image for current screen size
    optimizeImageForScreenSize();
    
    // Check initial position for scroll hint
    setTimeout(() => {
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            const scrollTop = mainContent.scrollTop;
            const clientHeight = mainContent.clientHeight;
            const scrollHeight = mainContent.scrollHeight;
            const isAtBottom = scrollTop + clientHeight >= scrollHeight - 20;
            
            if (isAtBottom) {
                document.body.classList.add('at-bottom');
                console.log('Initial check: Added at-bottom class');
            }
        }
    }, 1000);
}

// Remove section-based navigation for mobile
function removeMobileSectionNavigation() {
    // Remove mobile navigation indicators
    const mobileIndicators = document.querySelector('.mobile-nav-indicators');
    if (mobileIndicators) {
        mobileIndicators.style.display = 'none';
    }
    
    // Remove scroll-snap behavior
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.scrollSnapType = 'none';
        mainContent.style.scrollSnapStop = 'normal';
    }
    
    // Remove section scroll-snap
    const sections = document.querySelectorAll('.h-section');
    sections.forEach(section => {
        section.style.scrollSnapAlign = 'none';
        section.style.scrollSnapStop = 'normal';
    });
}

// Hide floating navigation elements on mobile
function hideFloatingNavigationOnMobile() {
    const floatingElements = document.querySelectorAll('.floating-nav');
    floatingElements.forEach(element => {
        element.style.display = 'none';
    });
}

// Hamburger menu removed for mobile

// Mobile menu functions removed



function modifyTouchNavigation() {
    // Touch navigation removed - multipage setup uses normal vertical scrolling
    // Only initialize mobile scroll tracking if needed
    if (isMobileDevice) {
    initializeMobileScrollTracking();
    }
}

function addMobileStyles() {
    // Add click handlers to mobile indicators
    const indicators = document.querySelectorAll('.nav-indicator');
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function(e) {
            e.preventDefault();
            if (!isTransitioning && loadingComplete) {
                // Add visual feedback
                indicator.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    indicator.style.transform = '';
                }, 200);
                
                goToSection(index);
            }
        });
    });
    
    // Add smooth scroll behavior for better mobile experience
    if (isMobileDevice) {
        document.documentElement.style.scrollBehavior = 'smooth';
        document.body.style.scrollBehavior = 'smooth';
    }
    
    console.log('Mobile optimizations applied');
}

// Mobile smooth scroll tracking - simplified for continuous scrolling
function initializeMobileScrollTracking() {
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;
    
    // Multi-page setup - allow normal scrolling, no automatic navigation updates
    const wrapper = document.getElementById('horizontalWrapper');
    if (!wrapper) {
        // Multi-page setup - allow normal scrolling, no automatic navigation updates
        return;
    }
    
    let hasScrolled = false;
    
    mainContent.addEventListener('scroll', function() {
        // Hide scroll hint after first scroll
        if (!hasScrolled) {
            hasScrolled = true;
            document.body.classList.add('has-scrolled');
        }
        
        // Check if user is at the bottom of the page
        const scrollTop = mainContent.scrollTop;
        const clientHeight = mainContent.clientHeight;
        const scrollHeight = mainContent.scrollHeight;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 20;
        
        if (isAtBottom) {
            document.body.classList.add('at-bottom');
            console.log('Added at-bottom class');
        } else {
            document.body.classList.remove('at-bottom');
        }
        
        // Update active navigation based on scroll position
        updateActiveNavigationFromScroll(scrollTop, clientHeight);
    }, { passive: true });
}

// Function to update active navigation based on visible content
function updateActiveNavigationFromScroll(scrollTop, clientHeight) {
    // Only work for single-page setup
    const wrapper = document.getElementById('horizontalWrapper');
    if (!wrapper) {
        return; // Multi-page setup - don't update navigation from scroll
    }
    
    if (!isMobileDevice) {
        console.log('Not mobile device, returning');
        return;
    }
    
    const navItems = document.querySelectorAll('.nav-item');
    console.log('Found nav items:', navItems.length);
    
    // Check what content is visible in the viewport
    const heroImage = document.querySelector('.hero-image');
    const sectionHeader = document.querySelector('.section-header');
    const contactForm = document.querySelector('.contact-form');
    
    console.log('Elements found:', {
        heroImage: !!heroImage,
        sectionHeader: !!sectionHeader,
        contactForm: !!contactForm
    });
    
    let activeSection = 0;
    
    if (heroImage) {
        const imageRect = heroImage.getBoundingClientRect();
        console.log('Image rect:', imageRect);
        // If image is visible (not scrolled past it)
        if (imageRect.bottom > 0 && imageRect.top < clientHeight) {
            activeSection = 0; // Home - when image_main is visible
            console.log('Home section active - image visible');
        }
    }
    
    if (sectionHeader && activeSection === 0) {
        const headerRect = sectionHeader.getBoundingClientRect();
        console.log('Header rect:', headerRect);
        // If we've scrolled past the image and see the section header
        if (headerRect.top < clientHeight * 0.5) {
            activeSection = 1; // About - when LLM/Consultancy is visible
            console.log('About section active - header visible');
        }
    }
    
    if (contactForm && activeSection !== 0) {
        const formRect = contactForm.getBoundingClientRect();
        console.log('Form rect:', formRect);
        // If we're near the contact form
        if (formRect.top < clientHeight * 0.7) {
            activeSection = 2; // Contact - when email/connect/touch is visible
            console.log('Contact section active - form visible');
        }
    }
    
    console.log('Final active section:', activeSection);
    
    // Update navigation items
    navItems.forEach((item, index) => {
        const wasActive = item.classList.contains('active');
        if (index === activeSection) {
            item.classList.add('active');
            if (!wasActive) console.log(`Activated nav item ${index}: ${item.textContent}`);
        } else {
            item.classList.remove('active');
            if (wasActive) console.log(`Deactivated nav item ${index}: ${item.textContent}`);
        }
    });
}

// Image optimization function for mobile devices
function optimizeImageForScreenSize() {
    if (!isMobileDevice) return;
    
    const heroImage = document.querySelector('.hero-image');
    const heroImageContainer = document.querySelector('.hero-image-container');
    
    if (!heroImage || !heroImageContainer) return;
    
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const isLandscape = screenWidth > screenHeight;
    
    console.log('Optimizing image for screen:', {
        width: screenWidth,
        height: screenHeight,
        isLandscape: isLandscape,
        orientation: screenWidth > screenHeight ? 'landscape' : 'portrait'
    });
    
    // Apply dynamic sizing based on screen dimensions
    if (screenWidth <= 320) {
        // Extremely small screens
        heroImage.style.maxHeight = '20vh';
        heroImageContainer.style.minHeight = '160px';
        heroImageContainer.style.padding = '0 0.125rem';
    } else if (screenWidth <= 360) {
        // Very small screens
        heroImage.style.maxHeight = '25vh';
        heroImageContainer.style.minHeight = '180px';
        heroImageContainer.style.padding = '0 0.25rem';
    } else if (screenWidth <= 480) {
        // Small screens
        heroImage.style.maxHeight = '30vh';
        heroImageContainer.style.minHeight = '200px';
        heroImageContainer.style.padding = '0 0.5rem';
    } else if (screenWidth <= 768) {
        // Medium screens
        heroImage.style.maxHeight = '35vh';
        heroImageContainer.style.minHeight = '250px';
        heroImageContainer.style.padding = '0 1rem';
    }
    
    // Handle landscape orientation for short screens
    if (isLandscape && screenHeight <= 500) {
        heroImage.style.maxHeight = '35vh';
        heroImageContainer.style.minHeight = '200px';
        heroImageContainer.style.padding = '0 1rem';
    } else if (isLandscape && screenHeight <= 400) {
        heroImage.style.maxHeight = '30vh';
        heroImageContainer.style.minHeight = '150px';
        heroImageContainer.style.padding = '0 0.5rem';
    }
    
    // Ensure image is fully visible
    heroImage.style.objectFit = 'contain';
    heroImage.style.objectPosition = 'center';
    heroImage.style.width = '100%';
    heroImage.style.height = 'auto';
    
    console.log('Image optimization applied:', {
        maxHeight: heroImage.style.maxHeight,
        minHeight: heroImageContainer.style.minHeight,
        padding: heroImageContainer.style.padding
    });
}

// Comprehensive responsive design system
function initializeResponsiveDesign() {
    // Only initialize responsive design on mobile devices
    if (!isMobileDevice) return;
    
    const body = document.body;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const aspectRatio = screenWidth / screenHeight;
    
    // Remove all existing responsive classes
    body.classList.remove(
        'screen-xs', 'screen-sm', 'screen-md', 'screen-lg', 'screen-xl', 'screen-2xl', 'screen-3xl',
        'orientation-portrait', 'orientation-landscape',
        'aspect-square', 'aspect-wide', 'aspect-ultra-wide', 'aspect-tall'
    );
    
    // Add screen size classes for mobile
    if (screenWidth <= 319) {
        body.classList.add('screen-xs');
    } else if (screenWidth <= 479) {
        body.classList.add('screen-sm');
    } else if (screenWidth <= 767) {
        body.classList.add('screen-md');
    }
    
    // Add orientation classes
    if (screenWidth > screenHeight) {
        body.classList.add('orientation-landscape');
    } else {
        body.classList.add('orientation-portrait');
    }
    
    // Add aspect ratio classes
    if (aspectRatio >= 0.8 && aspectRatio <= 1.2) {
        body.classList.add('aspect-square');
    } else if (aspectRatio <= 0.6) {
        body.classList.add('aspect-tall');
    } else if (aspectRatio > 1.2) {
        body.classList.add('aspect-wide');
    }
    
    // Apply responsive classes to elements
    applyResponsiveClasses();
    
    console.log('Mobile responsive design initialized:', {
        width: screenWidth,
        height: screenHeight,
        aspectRatio: aspectRatio.toFixed(2),
        classes: Array.from(body.classList).filter(cls => cls.startsWith('screen-') || cls.startsWith('orientation-') || cls.startsWith('aspect-'))
    });
}

// Apply responsive classes to specific elements
function applyResponsiveClasses() {
    // Only apply responsive classes on mobile devices
    if (isMobileDevice) {
        // Hero section
        const heroSection = document.querySelector('.h-section[data-section="0"]');
        if (heroSection) {
            heroSection.classList.add('section-responsive');
        }
        
        // About section
        const aboutSection = document.querySelector('.h-section[data-section="1"]');
        if (aboutSection) {
            aboutSection.classList.add('section-responsive');
        }
        
        // Contact section
        const contactSection = document.querySelector('.h-section[data-section="2"]');
        if (contactSection) {
            contactSection.classList.add('section-responsive');
        }
        
        // Navigation
        const bottomNav = document.querySelector('.bottom-nav');
        if (bottomNav) {
            bottomNav.classList.add('bottom-nav-responsive');
        }
        
        // Hero content
        const homeContent = document.querySelector('.home-content');
        if (homeContent) {
            homeContent.classList.add('content-spacing-responsive');
        }
        
        // Hero title
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.classList.add('text-scale-responsive-5xl');
        }
        
        // Hero description
        const heroDescription = document.querySelector('.hero-description');
        if (heroDescription) {
            heroDescription.classList.add('text-scale-responsive-lg');
        }
        
        // Hero actions
        const heroActions = document.querySelector('.hero-actions');
        if (heroActions) {
            heroActions.classList.add('flex-responsive');
        }
        
        // Buttons
        const primaryButtons = document.querySelectorAll('.btn-primary');
        const secondaryButtons = document.querySelectorAll('.btn-secondary');
        
        primaryButtons.forEach(btn => {
            btn.classList.add('btn-scale-responsive-lg');
        });
        
        secondaryButtons.forEach(btn => {
            btn.classList.add('btn-scale-responsive-lg');
        });
        
        // Solution cards
        const solutionCards = document.querySelectorAll('.solution-card');
        solutionCards.forEach(card => {
            card.classList.add('solution-card-responsive');
        });
        
        // Solutions grid
        const solutionsGrid = document.querySelector('.solutions-grid');
        if (solutionsGrid) {
            solutionsGrid.classList.add('solutions-grid-responsive');
        }
        
        // Contact form
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.classList.add('contact-form-responsive');
        }
        
        // Contact grid
        const contactGrid = document.querySelector('.contact-grid');
        if (contactGrid) {
            contactGrid.classList.add('contact-grid-responsive');
        }
        
        // Section headers
        const sectionHeaders = document.querySelectorAll('.section-header');
        sectionHeaders.forEach(header => {
            header.classList.add('content-spacing-responsive');
        });
        
        // Section titles
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles.forEach(title => {
            title.classList.add('text-scale-responsive-4xl');
        });
        
        // Section subtitles
        const sectionSubtitles = document.querySelectorAll('.section-subtitle');
        sectionSubtitles.forEach(subtitle => {
            subtitle.classList.add('text-scale-responsive-lg');
        });
    }
}

// Dynamic responsive adjustments
function adjustResponsiveLayout() {
    // Only adjust layout on mobile devices
    if (!isMobileDevice) return;
    
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // Adjust container max-width dynamically for mobile only
    const root = document.documentElement;
    let containerMaxWidth = '100%';
    let containerPadding = '1rem';
    
    if (screenWidth >= 768) {
        containerPadding = '1.5rem';
    } else if (screenWidth >= 480) {
        containerPadding = '1.25rem';
    } else if (screenWidth >= 360) {
        containerPadding = '1rem';
    } else if (screenWidth >= 320) {
        containerPadding = '0.75rem';
    } else {
        containerPadding = '0.5rem';
    }
    
    root.style.setProperty('--container-max-width', containerMaxWidth);
    root.style.setProperty('--container-padding', containerPadding);
    
    // Adjust navigation height for mobile
    let navHeight = '65px';
    if (screenWidth <= 480) {
        navHeight = screenWidth <= 360 ? (screenWidth <= 320 ? '50px' : '55px') : '60px';
    }
    
    root.style.setProperty('--nav-height', navHeight);
    
    console.log('Mobile responsive layout adjusted:', {
        containerMaxWidth,
        containerPadding,
        navHeight,
        screenWidth,
        screenHeight
    });
}

/* FAQ/BLOG REMOVED
// FAQ Accordion functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Toggle current item
            const isActive = item.classList.contains('active');
            
            // Optionally close other items (accordion behavior)
            // Comment out these lines if you want multiple items open at once
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
    
    console.log('FAQ accordion initialized');
}

// Blog CTA functionality
function initializeBlogCTA() {
    // Blog section CTA button
    const blogCtaButton = document.querySelector('.blog-cta .btn-primary');
    if (blogCtaButton) {
        blogCtaButton.addEventListener('click', function(e) {
            e.preventDefault();
            goToSection(2); // Navigate to Contact section
        });
    }
    
    // FAQ section CTA button
    const faqCtaButton = document.querySelector('.faq-cta .btn-primary');
    if (faqCtaButton) {
        faqCtaButton.addEventListener('click', function(e) {
            e.preventDefault();
            goToSection(2); // Navigate to Contact section
        });
    }
    
    console.log('Blog and FAQ CTAs initialized');
}

// Initialize blog article system
function initializeBlogArticles() {
    const blogCards = document.querySelectorAll('.blog-card');
    const articleView = document.getElementById('blogArticleView');
    const articleContent = document.getElementById('articleContent');
    const backBtn = document.getElementById('articleBackBtn');
    const articleCtaBtn = document.querySelector('.article-cta-btn');
    
    if (!articleView || !articleContent || !backBtn) return;
    
    // Make blog cards clickable
    blogCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const articleId = this.getAttribute('data-article');
            if (articleId && typeof window.showArticle === 'function') {
                window.showArticle(articleId);
            }
        });
    });
    
    // Back button functionality
    backBtn.addEventListener('click', function(e) {
        e.preventDefault();
        hideArticle();
    });
    
    // Article CTA button
    if (articleCtaBtn) {
        articleCtaBtn.addEventListener('click', function(e) {
            e.preventDefault();
            hideArticle();
            goToSection(2); // Go to Contact section
        });
    }
    
    console.log('Blog articles system initialized');
}

// Hide article function
function hideArticle() {
    const articleView = document.getElementById('blogArticleView');
    const blogSection = document.querySelector('[data-section="3"]');
    
    // Show blog section, hide article view
    if (blogSection) blogSection.style.display = 'block';
    if (articleView) articleView.style.display = 'none';
    
    // Update URL back to /blog
    if (window.location.pathname.startsWith('/blog/')) {
        history.pushState({}, '', '/blog');
    }
    
    // Navigate back to blog section
    const currentURL = window.location.pathname;
    if (currentURL === '/blog' || currentURL.startsWith('/blog/')) {
        // Force navigation to blog section
        navigateToSection(3);
    }
}

// Check for article in URL (called from initializeBlogArticles, not needed separately)
function checkForArticleInURL() {
    const path = window.location.pathname;
    if (path.startsWith('/blog/')) {
        const articleId = path.substring(6); // Remove '/blog/'
        if (window.blogArticles && window.blogArticles[articleId]) {
            // Navigate to blog section first, then show article
            currentSection = 3;
            goToSection(3);
            setTimeout(() => {
                if (typeof window.showArticle === 'function') {
                    window.showArticle(articleId);
                }
            }, 100);
        }
    }
}

// Handle browser back/forward for articles (only attach once)
(function() {
    let popstateHandlerAttached = false;
    if (!popstateHandlerAttached) {
        window.addEventListener('popstate', function(e) {
            const path = window.location.pathname;
            if (path.startsWith('/blog/')) {
                const articleId = path.substring(6);
                if (window.blogArticles && window.blogArticles[articleId]) {
                    if (typeof window.showArticle === 'function') {
                        window.showArticle(articleId);
                    }
                }
            } else if (path === '/blog') {
                if (typeof hideArticle === 'function') {
                    hideArticle();
                }
            }
        });
        popstateHandlerAttached = true;
    }
})();

// Console branding
console.log('%c🚀 KWForce Enterprise AI Solutions', 'color: #F0841D; font-size: 20px; font-weight: bold;');
console.log('%c⚡ Professional multipage experience loaded', 'color: #059669; font-size: 14px; font-weight: 600;');
console.log('%c✨ Hidden floating navigation activated', 'color: #F0841D; font-size: 12px; font-style: italic;');
console.log('%c📧 EmailJS contact system ready (with mailto fallback)', 'color: #6366f1; font-size: 12px; font-style: italic;');
console.log('%c📱 Mobile image optimization system activated', 'color: #F0841D; font-size: 12px; font-style: italic;');
console.log('%c🎯 Mobile-responsive design system activated', 'color: #8B5CF6; font-size: 12px; font-style: italic;');
console.log('%c🌐 Desktop layout preserved, mobile optimized', 'color: #10B981; font-size: 12px; font-style: italic;');
console.log('%c📰 Blog and FAQ sections loaded', 'color: #F0841D; font-size: 12px; font-style: italic;');
*/