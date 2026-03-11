
import { Briefcase } from 'lucide-react';

export default function CareersPage() {
    return (
        <div className="container mx-auto px-4 py-24 text-center">
            <div className="flex justify-center mb-6">
                <div className="p-4 bg-green-100 rounded-full">
                    <Briefcase className="w-12 h-12 text-green-600" />
                </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">Careers</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Join our kitchen! We'll be posting open positions here soon.
            </p>
        </div>
    );
}
