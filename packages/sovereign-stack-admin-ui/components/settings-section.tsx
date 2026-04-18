export interface SettingsSectionProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function SettingsSection({ title, description, icon, children }: SettingsSectionProps) {
  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
        {icon && <span className="text-primary">{icon}</span>}
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          {description && (
            <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>
      </div>
      <div className="divide-y divide-border">
        {children}
      </div>
    </div>
  );
}
