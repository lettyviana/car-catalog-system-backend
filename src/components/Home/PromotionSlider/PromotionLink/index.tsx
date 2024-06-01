import { TPromotionLink } from "@/lib/types";
import Link from "next/link";

const PromotionLink = ({ children, href, className }: TPromotionLink) => {
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
};

export default PromotionLink;
