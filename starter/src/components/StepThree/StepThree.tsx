import "./step-three.css";
import { FormWrapper } from "../FormWrapper/FormWrapper";

type UserData = {
  tutorial: string;
};

type UserFormProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void;
};

export const StepThree = ({ tutorial, updateFields }: UserFormProps) => {
  return (
    <FormWrapper>
      <div className="steps">
        <p>
          <span>2</span>
          How do you wish to engage with Kinemoe?
        </p>
        <div className="step-three">
          <label
            className={`interest-item ${tutorial === "yes" ? "selected" : ""}`}
          >
            <input
              type="radio"
              name="tutorial"
              value="yes"
              checked={tutorial === "yes"}
              onChange={(e) => updateFields({ tutorial: e.target.value })}
            />
            <div className="item-inner">
              <img src="/images/SignIn/Icons/icon3.png" alt="icon3" />
              <p>Show me around</p>
            </div>
          </label>
          <label
            className={`interest-item ${tutorial === "no" ? "selected" : ""}`}
          >
            <input
              type="radio"
              name="tutorial"
              value="no"
              checked={tutorial === "no"}
              onChange={(e) => updateFields({ tutorial: e.target.value })}
            />
            <div className="item-inner">
              <img src="/images/SignIn/Icons/icon4.png" alt="icon4" />
              <p>Dive right in and explore</p>
            </div>
          </label>
        </div>
      </div>
    </FormWrapper>
  );
};
