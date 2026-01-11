import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function AdPlaceholder() {
  return (
    <Card className="h-full flex flex-col justify-center items-center bg-muted/30 border-dashed">
      <CardContent className="p-4 text-center">
        <p className="text-sm text-muted-foreground">Advertisement</p>
        <div className="mt-2 aspect-video w-full rounded-md bg-muted flex items-center justify-center">
             <Image
                src="https://picsum.photos/seed/ad/300/150"
                width={300}
                height={150}
                alt="Ad placeholder"
                className="rounded-md opacity-50"
                data-ai-hint="advertisement graphic"
             />
        </div>
      </CardContent>
    </Card>
  );
}
