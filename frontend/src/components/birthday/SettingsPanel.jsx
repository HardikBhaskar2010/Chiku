import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Info } from "lucide-react";

export const SettingsPanel = ({ settings, onChange, onRevealEasterEgg }) => {
  const handleToggle = (key) => (checked) => {
    onChange({ ...settings, [key]: checked });
  };

  return (
    <section className="mx-auto w-full max-w-5xl px-4 pb-20 pt-4 sm:px-6 lg:px-10">
      <Card className="card-elevated bg-black/30">
        <CardHeader className="flex flex-row items-center justify-between gap-4 pb-4">
          <div>
            <div className="flex items-center gap-2 text-primary">
              <SlidersHorizontal className="h-4 w-4" />
              <p className="text-xs uppercase tracking-[0.18em]">Session settings</p>
            </div>
            <CardTitle className="mt-1 text-lg font-semibold tracking-tight text-foreground">
              Tune Chirags birthday rig
            </CardTitle>
          </div>
          <Button
            type="button"
            size="sm"
            variant="ghostHacker"
            onClick={onRevealEasterEgg}
          >
            <Info className="mr-1.5 h-4 w-4" />
            Hint: Ctrl + K
          </Button>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <SettingRow
            label="Falling code stream"
            description="Toggle the Matrix-style letter rain in the background."
            checked={settings.fallingLetters}
            onCheckedChange={handleToggle("fallingLetters")}
          />
          <SettingRow
            label="Music controls"
            description="Enable playback of the birthday track for Chirag."
            checked={settings.musicEnabled}
            onCheckedChange={handleToggle("musicEnabled")}
          />
          <SettingRow
            label="Confetti & fireworks"
            description="Allow confetti bursts on click or when pressing C."
            checked={settings.confettiEnabled}
            onCheckedChange={handleToggle("confettiEnabled")}
          />
          <SettingRow
            label="Image placeholders"
            description="Show the party gallery slots ready for real photos."
            checked={settings.imagesEnabled}
            onCheckedChange={handleToggle("imagesEnabled")}
          />
        </CardContent>
      </Card>
    </section>
  );
};

const SettingRow = ({ label, description, checked, onCheckedChange }) => {
  return (
    <div className="flex items-start justify-between gap-3 rounded-xl border border-muted bg-black/30 px-3.5 py-3">
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        aria-label={label}
      />
    </div>
  );
};
