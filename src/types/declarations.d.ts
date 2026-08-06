declare module "next-auth" {
    export interface Session {
        user?: {
            id?: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            role?: string;
        };
        expires: string;
    }

    export interface DefaultSession {
        user?: {
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
        expires: string;
    }

    export interface User {
        id?: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
        role?: string;
    }

    export interface NextAuthOptions {
        session?: any;
        jwt?: any;
        pages?: any;
        providers?: any[];
        callbacks?: any;
        secret?: string;
        debug?: boolean;
        adapter?: any;
    }

    export default function NextAuth(options: any): any;
    export function getServerSession(...args: any[]): Promise<any>;
}

declare module "next-auth/react" {
    export type ClientSafeProvider = {
        id: string;
        name: string;
        type: string;
        signinUrl: string;
        callbackUrl: string;
    };
    export function useSession(): { data: any; status: "authenticated" | "unauthenticated" | "loading" };
    export function signIn(...args: any[]): Promise<any>;
    export function signOut(...args: any[]): Promise<any>;
    export function getProviders(): Promise<Record<string, ClientSafeProvider> | null>;
    export function SessionProvider(props: any): any;
}

declare module "next-intl/plugin" {
    export default function createNextIntlPlugin(configPath?: string): (nextConfig?: any) => any;
}

declare module "next-auth/providers/credentials" {
    export default function CredentialsProvider(options: any): any;
}

declare module "next-auth/providers/google" {
    export default function GoogleProvider(options: any): any;
}

declare module "next-auth/providers/github" {
    export default function GithubProvider(options: any): any;
}

declare module "next-intl" {
    export function useTranslations(namespace?: string): (key: string, values?: Record<string, any>) => string;
    export function useLocale(): string;
    export function useMessages(): any;
    export function useTimeZone(): string;
    export function useNow(): Date;
    export function NextIntlClientProvider(props: any): any;
}

declare module "next-intl/server" {
    export function getTranslations(options?: any): Promise<(key: string, values?: Record<string, any>) => string>;
    export function getLocale(): Promise<string>;
    export function getMessages(options?: any): Promise<any>;
    export function getRequestConfig(callback: any): any;
}

declare module "next-intl/routing" {
    export function defineRouting(config: any): any;
}

declare module "next-intl/navigation" {
    export function createNavigation(routing: any): {
        Link: any;
        redirect: any;
        usePathname: any;
        useRouter: any;
        getPathname: any;
    };
}

declare module "next-intl/middleware" {
    export default function createMiddleware(routing: any): any;
}
