
import { BookOpen } from 'lucide-react';

export default function BlogPage() {
    return (
        <div className="container mx-auto px-4 py-24 text-center">
            <div className="flex justify-center mb-6">
                <div className="p-4 bg-blue-100 rounded-full">
                    <BookOpen className="w-12 h-12 text-blue-600" />
                </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">Cooking Blog</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Whip up some knowledge! Our blog posts are simmering and will be served shortly.
            </p>
        </div>
    );
}
