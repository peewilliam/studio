'use client';

import React, { useEffect, useState } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const ApiDocsPage = () => {
  const [specUrl, setSpecUrl] = useState<string | null>(null);

  useEffect(() => {
    const currentOrigin = window.location.origin;
    setSpecUrl(`${currentOrigin}/api/openapi.json`);
  }, []);

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-headline text-primary">Documentação da API ConLine - Sirius</CardTitle>
        </CardHeader>
        <CardContent>
          {specUrl ? (
            <SwaggerUI url={specUrl} />
          ) : (
            <div>
              <Skeleton className="h-12 w-1/2 mb-4" />
              <Skeleton className="h-8 w-full mb-2" />
              <Skeleton className="h-8 w-full mb-2" />
              <Skeleton className="h-8 w-3/4 mb-2" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiDocsPage;
