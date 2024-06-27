import "./step-four.css";
import { FormWrapper } from "../FormWrapper/FormWrapper";

type UserData = {
  subscription_type: string;
};

type UserFormProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void;
};

export const StepFour = ({
  subscription_type,
  updateFields,
}: UserFormProps) => {
  return (
    <FormWrapper>
      <div className="steps">
        <p>
          <span>3</span>
          How do you wish to engage with Kinemoe?
        </p>
        <div className="step-four options-container">
          <label
            className={`selected-card ${
              subscription_type === "free" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="subscription"
              value="free"
              checked={subscription_type === "free"}
              onChange={(e) =>
                updateFields({ subscription_type: e.target.value })
              }
            />

            <div className="option-card">
              <h4>Watch wih ads</h4>
              <h5>Free</h5>
              <div className="card-inner">
                <p>Access to a Vast Library</p>
                <p>Unlimited Streaming</p>
                <p>Multiple Devices</p>
                <p>No Subscription Fee</p>
              </div>
              <div className="login-btn">Register</div>
            </div>
          </label>
          <label
            className={`selected-card ${
              subscription_type === "payment" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="subscription"
              value="payment"
              checked={subscription_type === "payment"}
              onChange={(e) =>
                updateFields({ subscription_type: e.target.value })
              }
            />

            <div className="middle-card">
              <h3>Optional choice</h3>
              <div className="option-card">
                <h4>Pay to watch</h4>
                <h5>499den./month</h5>
                <div className="card-inner">
                  <p>Access to a Vast Library</p>
                  <p>Unlimited Streaming</p>
                  <p>Multiple Devices</p>
                  <p>Watch without ads</p>
                  <p>Offline Viewing</p>
                </div>
                <div className="login-btn">Register</div>
              </div>
            </div>
          </label>
          <label
            className={`selected-card ${
              subscription_type === "points" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="subscription"
              value="points"
              checked={subscription_type === "points"}
              onChange={(e) =>
                updateFields({ subscription_type: e.target.value })
              }
            />

            <div className="option-card">
              <h4>Engage and receive points</h4>
              <h5>Watch with points</h5>
              <div className="card-inner">
                <p>Earn points when you engage</p>
                <p>Claim rewards with earned points</p>
                <p>No Subscription Fee</p>
              </div>
              <div className="login-btn">Register</div>
            </div>
          </label>
        </div>
      </div>
    </FormWrapper>
  );
};
