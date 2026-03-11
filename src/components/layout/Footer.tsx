import { Link } from '@/i18n/routing';
import { ChefHat, Github, Twitter, Instagram } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-white dark:bg-zinc-900 border-t border-border mt-auto">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <ChefHat className="w-6 h-6 text-primary" />
                            <span className="text-xl font-bold text-foreground">CookAssistant</span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Your AI-powered cooking companion. Discover recipes, plan meals, and manage your kitchen with voice control.
                        </p>
                    </div>

                    {/* Links 1 */}
                    <div>
                        <h3 className="font-semibold mb-4 text-foreground">Features</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/recipes" className="hover:text-primary transition-colors">Smart Recipes</Link></li>
                            <li><Link href="/pantry" className="hover:text-primary transition-colors">Pantry Manager</Link></li>
                            <li><Link href="/voice" className="hover:text-primary transition-colors">Voice Assistant</Link></li>
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div>
                        <h3 className="font-semibold mb-4 text-foreground">Company</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                            <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="font-semibold mb-4 text-foreground">Connect</h3>
                        <div className="flex gap-4">
                            <a
                                href="https://x.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Follow on X"
                                className="p-2 bg-secondary rounded-full text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Follow on Instagram"
                                className="p-2 bg-secondary rounded-full text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="View on GitHub"
                                className="p-2 bg-secondary rounded-full text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} CookAssistant. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
