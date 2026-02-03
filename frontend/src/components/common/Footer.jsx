// Footer.jsx
// Simple footer with project name, tagline, and copyright
export default function Footer() {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 mt-auto shadow-inner">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="text-center space-y-2">
                    {/* Project name with icon */}
                    <div className="flex items-center justify-center gap-2 text-lg font-semibold text-green-400">
                        <span className="text-2xl">🌱</span>
                        <span>GreenAlgoBench</span>
                    </div>
                    {/* Tagline */}
                    <p className="text-sm text-slate-300 font-medium">
                        Carbon-Aware Computing
                    </p>
                    {/* Copyright */}
                    <p className="text-xs text-slate-500">
                        © 2026 GreenAlgoBench
                    </p>
                </div>
            </div>
        </footer>
    )
}
