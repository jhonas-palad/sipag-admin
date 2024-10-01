import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const DetailField = ({
  label,
  value,
  placeholder,
}: {
  label: string;
  value: string;
  placeholder: string;
}) => {
  return (
    <div>
      <Label className="text-lg font-bold">{label}</Label>
      <Input value={!value ? "" : value} disabled placeholder={placeholder} />
    </div>
  );
};

export { DetailField };
