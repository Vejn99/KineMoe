import { useState } from "react";
import "./input.css";
import { InputInterface } from "./InputInterface";

export const Input = (props: InputInterface) => {
  const [blurredInputs, setBlurredInputs] = useState<Set<string>>(new Set());

  const handleBlur = (name: string) => {
    setBlurredInputs((prev) => new Set(prev).add(name));
  };

  const renderInput = () => {
    return props.inputItems.map((item, index) => {
      const pattern = new RegExp(item.pattern);
      const hasError =
        blurredInputs.has(item.name) && !pattern.test(item.value || "");

      return (
        <div className="mb-4" key={index}>
          <input
            className={`login ps-4 ${hasError ? "red-border" : ""}`}
            type={item.type}
            name={item.name}
            placeholder={item.placeholder}
            value={item.value}
            onChange={item.onChange}
            onBlur={() => handleBlur(item.name)}
          />
          {hasError && <p className="error">{item.errorMsg}</p>}
        </div>
      );
    });
  };

  return <>{renderInput()}</>;
};
