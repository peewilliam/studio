import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Github, Zap } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-background to-secondary">
      <div className="text-center mb-12">
        <Zap className="mx-auto h-24 w-24 text-primary mb-4" />
        <h1 className="text-5xl font-bold font-headline text-primary mb-3">
          Welcome to TrackMaster API
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A modern, secure, and well-structured RESTful API for process tracking. 
          Built with Next.js and SQL Server.
        </p>
      </div>

      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-center">Get Started</CardTitle>
          <CardDescription className="text-center">
            Explore the API documentation to understand how to integrate and use our services.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <Link href="/api-docs" legacyBehavior passHref>
            <Button size="lg" className="w-full">
              <FileText className="mr-2 h-5 w-5" />
              View API Documentation
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground">
            (Powered by Swagger/OpenAPI)
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
           <p className="text-xs text-muted-foreground">
            Version 1.0.0
          </p>
        </CardFooter>
      </Card>

      <div className="mt-16 text-center">
        <p className="text-muted-foreground">
          Need help or want to contribute?
        </p>
        <a 
          href="https://github.com" // Replace with actual GitHub link if available
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:text-accent transition-colors font-medium inline-flex items-center"
        >
          <Github className="mr-2 h-4 w-4" /> Visit our GitHub (Example)
        </a>
      </div>
    </main>
  );
}
