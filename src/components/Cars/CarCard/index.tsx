import { TCarCard } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDeleteForever } from "react-icons/md";

const CarCard = ({
  photo,
  make,
  model,
  year,
  price,
  version,
  href,
  onClick,
}: TCarCard) => {
  const pathname = usePathname();
  const formattedPrice = price.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
  });

  const isAdminPage = pathname === "/admin";

  return (
    <div
      className={
        "car-card-container " + (isAdminPage ? "admin-card-container" : "")
      }
    >
      {isAdminPage && (
        <button type="button" className="delete-button" onClick={onClick}>
          <MdDeleteForever />
        </button>
      )}
      <Link href={`/${href}`} className="car-card">
        <div className="image-container">
          <Image
            src={photo}
            alt={`${make} • ${model}`}
            width={312}
            height={192}
          />
        </div>
        <div className="main-info-container">
          <div className="make-model-year-container">
            <div className="make-model-container">
              <h3 className="title">
                {make} • {model}
              </h3>
            </div>
            <div className="year-version-container">
              <span>
                {year} • {version}
              </span>
            </div>
          </div>
          <div className="price-container">
            <p className="price-label">Preço à vista</p>
            <span className="money-sign">
              R$ <span className="price">{formattedPrice}</span>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CarCard;
