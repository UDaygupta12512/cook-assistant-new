
import { Mail } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-24 text-center">
            <div className="flex justify-center mb-6">
                <div className="p-4 bg-purple-100 rounded-full">
                    <Mail className="w-12 h-12 text-purple-600" />
                </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Have questions? We'd love to hear from you. Drop us a line at support@cookassistant.com
            </p>
        </div>
    );
}
