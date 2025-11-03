# 🚀 Prompt Vault: Your Ultimate AI Prompt Management System

> **Stop losing your best prompts. Start organizing like a pro.**

**🌐 [Try the Live Demo](https://martinfou.github.io/prompt-vault/)**

Transform your scattered AI prompts into a powerful, organized knowledge base. Prompt Vault is the modern, zero-configuration solution that helps developers, content creators, and AI power users save time, boost productivity, and never lose a great prompt again.

---

## ✨ Why Prompt Vault?

### 🎯 **Built for Speed**
- **Zero Setup**: Just open and go. No accounts, no installations, no fuss.
- **Lightning Fast**: Single HTML file means instant loading—no build process, no waiting.
- **Works Offline**: Everything runs locally in your browser. No internet? No problem.

### 💎 **Powerful Organization**
- **27 Pre-built Templates**: Hit the ground running with professional prompts for CRISPE, Elavis, and SPARC frameworks.
- **Smart Categorization**: Organize prompts by project, role, or any system that works for you.
- **Flexible Tagging**: Find exactly what you need with multi-tag filtering and instant search.

### 🔒 **Your Data, Your Control**
- **100% Private**: All data stays in your browser. No cloud storage, no tracking, no privacy concerns.
- **Easy Backup**: One-click export keeps your prompts safe forever.
- **Portable**: Move your entire prompt library between devices with a single JSON file.

### 🌟 **Built for Real Work**
- **Professional Templates**: From Git commit messages to technical documentation, we've got you covered.
- **Usage Tracking**: Know which prompts work best with built-in usage history.
- **Dark Mode**: Work comfortably in any lighting condition.

---

## 🎁 What You Get

### 📚 **27 Professional Templates Ready to Use**

**CRISPE Framework** (12 templates):
- Professional Git Commit Message Generator
- Senior Programmer Assistant
- Scrum Master - Sprint Planning Assistant
- Software Architect Advisor
- Code Review Assistant
- Technical Documentation Architect
- UX Designer & User Experience Architect
- Individual Contributor Assistant
- Engineering Manager Assistant
- Spring Boot MapStruct Mapper Example
- Spring Boot WebClient Example
- Professional Unit Test with Mockito & JUnit 5

**Elavis Framework** (7 templates):
- Content Generator
- Professional Email Writer
- Blog Post Generator
- Technical Writer
- Social Media Content Writer
- Individual Contributor Communication
- Manager Communication

**SPARC Framework** (7 templates):
- Technical Documentation
- Code Explanation & Documentation
- Project Proposal Writer
- User Guide Writer
- Meeting Summary Writer
- Individual Contributor Documentation
- Manager Documentation

### 🛠️ **Everything You Need**

✅ **Full CRUD Operations**: Create, edit, duplicate, and delete prompts effortlessly  
✅ **Smart Search**: Find prompts instantly across titles, content, tags, and categories  
✅ **Advanced Filtering**: Combine category and tag filters for precision  
✅ **Syntax Highlighting**: View your prompts with beautiful code formatting  
✅ **Word & Character Count**: Track prompt length at a glance  
✅ **Usage Analytics**: See when prompts were created, modified, and last used  
✅ **Import/Export**: Backup and migrate your entire prompt library  
✅ **Responsive Design**: Works beautifully on desktop, tablet, and mobile  
✅ **Dark Mode**: Eye-friendly theme for late-night coding sessions  

---

## 🚀 Get Started in 60 Seconds

### Option 1: Use Online (If Deployed)
If Prompt Vault is deployed to GitHub Pages, simply visit:
- **🌐 Live Demo**: [https://martinfou.github.io/prompt-vault/](https://martinfou.github.io/prompt-vault/)

No download required! Just open in your browser and start using it immediately.

### Option 2: Download Locally

**Step 1: Download**
```bash
git clone <repository-url>
cd prompt-vault
```

Or simply download the ZIP file and extract it.

**Step 2: Open**
Double-click `index.html` or serve it locally:
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

### Step 3: Start Creating
Click **"+ New Prompt"** and you're ready to go. No configuration, no setup, no learning curve.

**That's it.** Your prompts are now being saved automatically in your browser.

---

## 💡 Quick Start Guide

### Creating Your First Prompt

1. Click **"+ New Prompt"** in the header
2. Choose a template (optional) or start from scratch
3. Fill in:
   - **Title**: Give it a memorable name
   - **Category**: Organize it (e.g., "Code Review", "Documentation")
   - **Tags**: Add keywords for easy finding (e.g., "api, rest, best-practices")
   - **Content**: Write your prompt
4. Click **"Save"** — done!

### Finding Prompts

- **Search**: Type in the search box to find prompts by any keyword
- **Filter by Category**: Click categories in the sidebar
- **Filter by Tags**: Click tag buttons to see all prompts with that tag
- **Combine Filters**: Use multiple filters together for precise results

### Keeping Your Data Safe

**Export Regularly**: Click **"Export"** to download a JSON backup file. Do this weekly or after adding important prompts.

**Restore Anytime**: Click **"Import"** to restore from a backup file. Your prompts are merged seamlessly.

**Migrate Between Devices**: Export from one browser/device, import to another. It's that simple.

---

## 🎨 Perfect For

- **👨‍💻 Developers**: Manage code review prompts, documentation templates, and technical writing prompts
- **📝 Content Creators**: Organize blog post templates, social media prompts, and email generators
- **🎯 Project Managers**: Keep sprint planning prompts, meeting summaries, and communication templates
- **🏗️ Architects**: Store design decision prompts, technical documentation templates, and code explanation prompts
- **📚 Technical Writers**: Maintain documentation standards, user guides, and project proposals
- **🚀 AI Power Users**: Build a personal library of your most effective prompts

---

## 🔧 Technical Details

### Technology Stack
- **Alpine.js 3.x**: Modern, lightweight reactivity
- **Tailwind CSS**: Beautiful, responsive design
- **Highlight.js**: Code syntax highlighting
- **LocalStorage API**: Fast, local data persistence

### Browser Support
✅ Chrome/Chromium 90+ | Edge 90+ | Firefox 88+ | Safari 14+ | Opera 76+

Works on desktop and mobile. No Internet Explorer support.

### Requirements
- Modern web browser (any of the above)
- That's it. No Node.js, no build tools, no dependencies.

---

## 📦 What's Included

```
prompt-vault/
├── index.html          # The entire application (single file!)
├── README.md           # This file
├── LICENSE             # MIT License
└── docs/               # Additional documentation
```

**Yes, it's really just one HTML file.** Everything is self-contained.

---

## 🌐 Deploy to GitHub Pages

**Host your Prompt Vault for free on GitHub Pages!** Share it with others or access it from anywhere.

### Automatic Deployment (Recommended)

The repository includes a GitHub Actions workflow that automatically deploys to GitHub Pages when you push to the `master` or `main` branch.

**⚠️ IMPORTANT: You MUST enable GitHub Pages FIRST before the workflow can deploy!**

**First-time Setup (CRITICAL - Do this FIRST):**

1. **Enable GitHub Pages** in your repository (DO THIS BEFORE PUSHING):
   - Go to your repository on GitHub: `https://github.com/<your-username>/prompt-vault/settings/pages`
   - Click **Settings** → **Pages** (in the left sidebar)
   - Under **Source**, select **GitHub Actions**
   - Click **Save** to enable Pages
   - ⚠️ **If you don't do this first, the workflow will fail with "Not Found" errors**

2. **Push your code** to trigger deployment:
   ```bash
   git push origin master
   ```

3. **Wait for deployment** (usually 1-2 minutes):
   - Check the **Actions** tab in your repository
   - The workflow will deploy automatically
   - Your site will be available at: `https://<your-username>.github.io/prompt-vault/`

**That's it!** Every time you push to `master` or `main`, your site will automatically update.

### Troubleshooting

**Error: "Not Found" or "Get Pages site failed"**
- This means GitHub Pages is not enabled yet
- Go to **Settings** → **Pages** and select **GitHub Actions** as the source
- Save the settings, then the next workflow run will succeed

**Workflow fails on first run**
- Make sure you enabled Pages in Settings first (step 1 above)
- Wait a few minutes after enabling Pages before pushing
- Check the Actions tab for detailed error messages

### Manual Deployment

If you prefer manual deployment:

1. Go to **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Choose `master` or `main` branch and `/ (root)` folder
4. Click **Save**

### Custom Domain (Optional)

Want to use your own domain? Simply add a `CNAME` file to the root of your repository:

```bash
echo "yourdomain.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

Then configure DNS settings with your domain provider to point to GitHub Pages.

---

## 🎯 Use Cases

### For Development Teams
- Share prompt templates across your team
- Standardize code review processes
- Maintain consistent documentation style
- Create team-specific prompt libraries

### For Individual Productivity
- Build your personal prompt library
- Track which prompts get the best results
- Organize prompts by project or client
- Never lose a great prompt again

### For Learning & Experimentation
- Save your best prompt variations
- Compare different prompt strategies
- Build a knowledge base of what works
- Share discoveries with colleagues

---

## 🔄 Regular Backups Made Simple

**Why Backups Matter**: Your prompts are stored in browser localStorage. Clearing browser data will delete them.

**The Solution**: One-click export creates a complete backup file.

**Best Practices**:
- Export weekly or after adding important prompts
- Name backups with dates: `prompt-vault-2024-01-15.json`
- Store backups in multiple places (local + cloud)
- Import/export works seamlessly between browsers and devices

---

## 💻 Development & Customization

### Running Tests
- Open `tests/test.html` for automated tests
- Use the "🧪 Test Buttons" button in the app header
- Check `tests/test-page.html` for interactive testing

### Customizing
- Modify `index.html` directly (it's all in one file!)
- Add your own templates in the `loadPromptTemplate()` function
- Customize colors and styling with Tailwind CSS classes

---

## 🤝 Contributing

We welcome contributions! Found a bug? Have an idea? Want to add more templates?

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

MIT License - Use it freely for personal or commercial projects.

---

## ❓ Questions?

Open an issue on GitHub. We're here to help!

---

## 🌟 Ready to Transform Your Prompt Workflow?

**Download Prompt Vault now and experience the difference:**

- ⚡ **Instant setup** — no configuration needed
- 🎯 **Immediate value** — 27 templates ready to use
- 🔒 **Complete privacy** — your data stays local
- 💾 **One-click backups** — never lose your prompts
- 🎨 **Beautiful interface** — work with pleasure

**Stop losing prompts. Start organizing like a pro.**

```bash
git clone <repository-url>
cd prompt-vault
open index.html
```

---

**Note**: This is a client-side application. All data is stored locally in your browser. Export regularly to keep backups, especially before clearing browser data or switching browsers.
