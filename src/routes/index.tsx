import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Check, ChevronDown, ChevronRight, Clipboard, ExternalLink, Github, Laptop, Moon, Play, Terminal } from 'lucide-react'

const repo = 'https://github.com/ggabhdnfj/RVG.git'
const steps = [
  { title: 'پیش‌نیازها', caption: 'Python 3.11+ و Git', command: 'python --version\ngit --version', note: 'اگر Python پایین‌تر از 3.11 است، نسخه جدید را از python.org نصب کنید.' },
  { title: 'دریافت سورس', caption: 'کلون ریپازیتوری خودتان', command: `git clone ${repo}\ncd RVG`, note: 'اگر پوشه RVG از قبل وجود دارد، داخل همان پوشه بروید و git pull اجرا کنید.' },
  { title: 'محیط مجازی', caption: 'جدا نگه‌داشتن وابستگی‌ها', command: 'python -m venv venv\n# macOS / Linux\nsource venv/bin/activate\n# Windows PowerShell\n.\\venv\\Scripts\\Activate.ps1', note: 'در ویندوز فقط دستور Activate.ps1 را اجرا کنید؛ در macOS/Linux از source استفاده کنید.' },
  { title: 'نصب وابستگی‌ها', caption: 'FastAPI، Uvicorn و کتابخانه‌های پروژه', command: 'python -m pip install --upgrade pip\npip install -r requirements.txt', note: 'در فایل نیازمندی‌ها نسخه‌های FastAPI، Uvicorn، httpx، websockets و redis تعریف شده‌اند.' },
  { title: 'تنظیم رمز مدیر', caption: 'قبل از اجرای پنل', command: '# macOS / Linux\nexport ADMIN_PASSWORD="یک-رمز-قوی"\nexport SECRET_KEY="یک-کلید-تصادفی-طولانی"\n\n# Windows PowerShell\n$env:ADMIN_PASSWORD="یک-رمز-قوی"\n$env:SECRET_KEY="یک-کلید-تصادفی-طولانی"', note: 'کد فعلی رمز پیش‌فرض 123456 دارد. قبل از اجرای پنل آن را با ADMIN_PASSWORD تغییر دهید؛ مقادیر محیطی فقط تا بستن همان ترمینال فعال‌اند.' },
  { title: 'اجرای RVG', caption: 'راه‌اندازی سرویس محلی', command: 'python main.py', note: 'بعد از اجرای موفق، داشبورد را در http://localhost:8000/dashboard باز کنید.' },
]

export const Route = createFileRoute('/')({
  head: () => ({ meta: [{ title: 'RVG Repo Launcher' }, { name: 'description', content: 'راهنمای نصب و اجرای محلی ریپازیتوری RVG' }] }),
  component: Launcher,
})

function Launcher() {
  const [os, setOs] = useState<'unix' | 'windows'>('unix')
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState<number | null>(null)
  const [done, setDone] = useState<number[]>([])
  const commands = (idx: number) => {
    if (idx !== 2 && idx !== 4) return steps[idx].command
    const lines = steps[idx].command.split('\n')
    return os === 'windows' && idx === 2 ? `${lines[0]}\n# Windows PowerShell\n${lines[4]}` : os === 'windows' ? `${lines[4]}\n${lines[5]}` : idx === 2 ? `${lines[0]}\n# macOS / Linux\n${lines[2]}` : `${lines[1]}\n${lines[2]}\n${lines[3]}`
  }
  async function copy(index: number) {
    await navigator.clipboard.writeText(commands(index))
    setCopied(index)
    window.setTimeout(() => setCopied(null), 1500)
  }
  const markDone = (index: number) => setDone(current => current.includes(index) ? current.filter(i => i !== index) : [...current, index])
  return (
    <main dir="rtl" className="min-h-dvh overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 opacity-40 [background-image:radial-gradient(var(--border)_0.7px,transparent_0.7px)] [background-size:24px_24px]" />
      <header className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-6 md:px-10">
        <a href="#top" className="flex items-center gap-3" aria-label="RVG Launcher home"><span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground"><Terminal size={20}/></span><span className="font-mono text-sm font-semibold tracking-tight">RVG<span className="text-primary">/</span>LAUNCHER</span></a>
        <a href="https://github.com/ggabhdnfj/RVG" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition hover:border-primary hover:text-primary"><Github size={16}/> مخزن GitHub <ExternalLink size={13}/></a>
      </header>
      <section id="top" className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-12 md:grid-cols-[1.05fr_.95fr] md:px-10 md:pb-24 md:pt-20">
        <div className="animate-fade-in">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 font-mono text-xs text-primary"><span className="size-1.5 animate-pulse rounded-full bg-primary"/> REPOSITORY SETUP GUIDE <span className="text-muted-foreground">· v9.2</span></div>
          <h1 className="max-w-2xl font-serif text-5xl leading-[1.14] tracking-tight md:text-7xl">RVG را روی سیستم خودت <span className="text-primary">راه بینداز.</span></h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">راهنمای قدم‌به‌قدم برای کلون‌کردن ریپو، نصب پیش‌نیازها و اجرای پنل RVG Gateway به‌صورت محلی.</p>
          <div className="mt-8 flex flex-wrap gap-3"><a href="#setup" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-md transition hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"><Play size={16}/> شروع نصب <ChevronRight size={16}/></a><a href="https://github.com/ggabhdnfj/RVG" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 font-semibold transition hover:border-primary"><Github size={17}/> مشاهده سورس</a></div>
          <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-muted-foreground"><span>PYTHON 3.11+</span><span className="text-border">/</span><span>FASTAPI</span><span className="text-border">/</span><span>LOCALHOST:8000</span></div>
        </div>
        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-8 rounded-[2.5rem] bg-primary/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
            <div className="flex items-center justify-between border-b border-border px-5 py-4"><div className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-destructive/70"/><span className="size-2.5 rounded-full bg-accent"/><span className="size-2.5 rounded-full bg-primary/60"/></div><span className="font-mono text-xs text-muted-foreground">terminal — rvg</span><Terminal size={15} className="text-muted-foreground"/></div>
            <div className="space-y-5 p-5 font-mono text-xs leading-6 md:p-7 md:text-sm"><p className="text-muted-foreground"># دریافت سورس و ورود به پوشه</p><p><span className="text-primary">❯</span> git clone <span className="text-accent-foreground">github.com/ggabhdnfj/RVG</span></p><p><span className="text-primary">❯</span> cd RVG <span className="text-muted-foreground">&amp;&amp; python -m venv venv</span></p><p className="text-muted-foreground"># نصب نیازمندی‌ها</p><p><span className="text-primary">❯</span> pip install -r requirements.txt</p><div className="my-3 h-px bg-border"/><div className="flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 p-4"><div><div className="text-[10px] tracking-wider text-muted-foreground">DASHBOARD READY</div><div className="mt-1 text-primary">http://localhost:8000/dashboard</div></div><span className="size-2.5 animate-pulse rounded-full bg-primary"/></div><p className="text-muted-foreground">● server listening on :8000</p></div>
          </div>
          <div className="absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-md sm:flex"><span className="grid size-9 place-items-center rounded-lg bg-accent/40 text-foreground"><Check size={17}/></span><span><span className="block text-xs font-semibold">پیش‌نیازها مشخص‌اند</span><span className="font-mono text-[10px] text-muted-foreground">6 STEPS · COPY READY</span></span></div>
        </div>
      </section>
      <section id="setup" className="relative border-t border-border bg-card/60">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[280px_1fr] md:px-10 md:py-20">
          <aside className="md:sticky md:top-8 md:self-start"><div className="font-mono text-xs tracking-[.18em] text-primary">LOCAL DEVELOPMENT</div><h2 className="mt-3 font-serif text-3xl leading-tight">نصب، قدم‌به‌قدم</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">سیستم‌عامل را انتخاب کن و دستورها را با یک کلیک کپی کن.</p>
            <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl border border-border bg-background p-1"><button onClick={()=>setOs('unix')} className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm transition ${os==='unix'?'bg-primary text-primary-foreground':'text-muted-foreground hover:text-foreground'}`}><Laptop size={15}/> macOS/Linux</button><button onClick={()=>setOs('windows')} className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm transition ${os==='windows'?'bg-primary text-primary-foreground':'text-muted-foreground hover:text-foreground'}`}><Laptop size={15}/> Windows</button></div>
            <div className="mt-6 rounded-xl border border-accent/40 bg-accent/10 p-4"><div className="flex items-center gap-2 text-sm font-semibold"><Moon size={15}/> نکته امنیتی</div><p className="mt-2 text-xs leading-6 text-muted-foreground">رمز پیش‌فرض پنل در کد فعلی 123456 است. پیش از دسترسی عمومی حتماً ADMIN_PASSWORD را تغییر بده.</p></div>
          </aside>
          <div className="space-y-3">
            {steps.map((step,index)=><article key={step.title} className={`overflow-hidden rounded-2xl border transition ${active===index?'border-primary/40 bg-card shadow-md':'border-border bg-background/70'}`}>
              <button onClick={()=>setActive(active===index?-1:index)} className="flex w-full items-center gap-4 px-4 py-4 text-right md:px-5"><span className={`grid size-9 shrink-0 place-items-center rounded-xl font-mono text-sm ${done.includes(index)?'bg-primary text-primary-foreground':'bg-secondary text-primary'}`}>{done.includes(index)?<Check size={17}/>:String(index+1).padStart(2,'0')}</span><span className="min-w-0 flex-1"><span className="block font-semibold">{step.title}</span><span className="mt-0.5 block text-xs text-muted-foreground">{step.caption}</span></span><ChevronDown size={17} className={`shrink-0 text-muted-foreground transition ${active===index?'rotate-180':''}`}/></button>
              {active===index&&<div className="border-t border-border px-4 pb-4 pt-4 md:px-5"><div className="relative rounded-xl bg-[oklch(0.2_0.025_195)] p-4 text-left text-xs leading-6 text-[oklch(0.91_0.025_175)] md:text-sm" dir="ltr"><button onClick={()=>copy(index)} aria-label="کپی دستورها" className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] text-[oklch(0.8_0.04_175)] transition hover:bg-white/10">{copied===index?<Check size={13}/>:<Clipboard size={13}/>} {copied===index?'Copied':'Copy'}</button><pre className="overflow-x-auto whitespace-pre-wrap pr-2 pt-1 font-mono">{commands(index)}</pre></div><div className="mt-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><p className="text-xs leading-6 text-muted-foreground">{step.note}</p><button onClick={()=>markDone(index)} className={`shrink-0 rounded-lg border px-3 py-2 text-xs font-medium transition ${done.includes(index)?'border-primary bg-primary/10 text-primary':'border-border hover:border-primary hover:text-primary'}`}>{done.includes(index)?'انجام شد':'علامت‌گذاری به‌عنوان انجام‌شده'}</button></div></div>}
            </article>)}
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-border bg-secondary/60 p-4 text-sm"><Terminal size={17} className="mt-0.5 shrink-0 text-primary"/><p className="leading-7 text-muted-foreground">پس از اجرا، پنل در <a href="http://localhost:8000/dashboard" target="_blank" rel="noreferrer" className="font-mono text-primary underline decoration-primary/40 underline-offset-4">localhost:8000/dashboard</a> در دسترس است. اجرای واقعی باید در ترمینال سیستم خودتان انجام شود.</p></div>
          </div>
        </div>
      </section>
      <footer className="relative mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-10"><span className="font-mono">RVG GATEWAY <span className="text-primary">·</span> PERSONAL REPOSITORY</span><a href="https://github.com/ggabhdnfj/RVG#-local-development" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition hover:text-primary">مستندات مخزن <ExternalLink size={12}/></a></footer>
    </main>
  )
}
