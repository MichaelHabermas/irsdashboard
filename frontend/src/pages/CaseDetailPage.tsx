import { useParams } from 'react-router';

export function CaseDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1 className="text-[22px] font-semibold tracking-tight text-foreground">
        Case <span className="font-mono text-muted-foreground">{id}</span>
      </h1>
      <p className="mt-1 text-[12.5px] text-muted-foreground">
        Case detail — gauge, drivers, tabs (attribution, RAG, fairness). Coming in slice 6.4.1.
      </p>
    </div>
  );
}
