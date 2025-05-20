const ButtonCustom = ({
  text,
  iconLeft,
  iconRight,
  size = "medium", // Kích thước mặc định
  variant = "default", // Kiểu mặc định
  outline = true, // Có viền hay không
  onClick,
  className,
}) => {
  // Xác định kích thước
  const sizeClasses = {
    small: "px-4 py-1 text-sm",
    medium: "px-4 py-2 text-sm",
    large: "px-6 py-3 text-base",
  };

  // Xác định kiểu
  const variantClasses = {
    default: " text-black",
    primary: "bg-black/80 text-white text-bold",
    // secondary: " bg-black/80 text-white",
    success: "bg-green-500 text-white",
    danger: "bg-red-500 text-white",
  };

  return (
    <div
      className={
        ("rounded-[20px] inline-flex justify-center items-center transition-all duration-200  cursor-pointer",
        sizeClasses[size], // Áp dụng kích thước
        variantClasses[variant], // Áp dụng kiểu
        {
          "outline outline-1 outline-offset-[-1px] outline-black": outline, // Áp dụng viền nếu outline là true
        },
        className) // Thêm class tùy chỉnh từ props
      }
      onClick={onClick}
    >
      <div className="flex justify-start gap-1 items-center">
        {iconLeft && (
          <img
            className={
              ("w-[16px] h-[16px]",
              {
                "w-[12px] h-[12px]": size === "small",
                "w-[20px] h-[20px]": size === "large",
              })
            }
            src={iconLeft}
            alt="icon-button"
          />
        )}
        <p>{text}</p>
        {iconRight && (
          <img
            className={
              ("w-[16px] h-[16px]",
              {
                "w-[12px] h-[12px]": size === "small",
                "w-[20px] h-[20px]": size === "large",
              })
            }
            src={iconRight}
            alt="icon-button"
          />
        )}
      </div>
    </div>
  );
};

export default ButtonCustom;
