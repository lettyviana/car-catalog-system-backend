import { TSubmitButton } from "@/lib/types";

const SubmitButton = ({
  disabled,
  buttonType,
  buttonText,
  extraStyle,
}: TSubmitButton) => {
  return (
    <button
      className={`submit-button ${extraStyle}`}
      type={buttonType}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
};

export default SubmitButton;
