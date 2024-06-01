"use client";
import { useEffect, useState } from "react";
import PromotionSlider from "@/components/Home/PromotionSlider";
import SearchBox from "@/components/Home/SearchBox";
import CarCard from "@/components/Cars/CarCard";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { CarsPublicService } from "@/lib/services/CarsPublicService";
import { TCarInfo } from "@/lib/types";

const carServices = new CarsPublicService();

export default function Home() {
  const [cars, setCars] = useState<TCarInfo[]>([]);
  const [ordering, setOrdering] = useState("menor_preco");
  const [showOrderingOptions, setShowOrderingOptions] = useState(false);
  const [parallax, setParallax] = useState(false);

  const getCars = async () => {
    try {
      const result = await carServices.getCars();

      if (result) {
        setCars(result);
      }
    } catch (error) {
      console.error(`Erro ao exibir os módulos: ${error}`);
    }
  };

  useEffect(() => {
    getCars();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 100;

      if (scrollY > threshold) {
        setParallax(true);
      } else {
        setParallax(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleOrderingChange = (newOrdering: string) => {
    setOrdering(newOrdering);
  };

  const openOrderingOptions = () => {
    setShowOrderingOptions(!showOrderingOptions);
  };

  const orderCars = () => {
    switch (ordering) {
      case "menor_preco":
        return cars.slice().sort((a, b) => a.price - b.price);
      case "maior_preco":
        return cars.slice().sort((a, b) => b.price - a.price);
      case "mais_antigos":
        return cars.slice().sort((a, b) => a.year! - b.year!);
      case "mais_novos":
        return cars.slice().sort((a, b) => b.year! - a.year!);
      default:
        return cars;
    }
  };

  const orderedCars = orderCars();

  const orderingTexts: Record<string, string> = {
    menor_preco: "Menor preço",
    maior_preco: "Maior preço",
    mais_antigos: "Mais antigos",
    mais_novos: "Mais novos",
    relevancia: "Relevância",
  };

  return (
    <>
      <PromotionSlider />
      <main className="main-home-section">
        <div className={`search-nav ${parallax ? "fixed-section" : ""}`}>
          <SearchBox />
          <section className="results-and-ordering-section">
            <span className="section-title">Carros Seminovos</span>
            <div className="results-and-ordering">
              <div className="results-container">
                <span>{orderedCars.length} </span>Resultados
              </div>
              <div
                className="ordering-container"
                aria-label="Escolha a ordem de exibição"
                onClick={openOrderingOptions}
              >
                <button className="ordering-group">
                  <span>Ordenar: </span>
                  <span className="selected-option">
                    {orderingTexts[ordering]}{" "}
                    {showOrderingOptions ? (
                      <MdOutlineKeyboardArrowUp />
                    ) : (
                      <MdOutlineKeyboardArrowDown />
                    )}
                  </span>
                </button>
                <div
                  className={
                    "ordering-options " +
                    (showOrderingOptions ? "options-menu-open" : "")
                  }
                >
                  <button
                    type="button"
                    aria-label="menor preco"
                    onClick={() => handleOrderingChange("menor_preco")}
                    className={ordering === "menor_preco" ? "selected" : ""}
                  >
                    Menor preço
                  </button>
                  <button
                    type="button"
                    aria-label="maior preço"
                    onClick={() => handleOrderingChange("maior_preco")}
                    className={ordering === "maior_preco" ? "selected" : ""}
                  >
                    Maior preço
                  </button>
                  <button
                    type="button"
                    aria-label="relevância"
                    onClick={() => handleOrderingChange("relevancia")}
                    className={ordering === "relevancia" ? "selected" : ""}
                  >
                    Relevância
                  </button>
                  <button
                    type="button"
                    aria-label="mais antigos"
                    onClick={() => handleOrderingChange("mais_antigos")}
                    className={ordering === "mais_antigos" ? "selected" : ""}
                  >
                    Mais antigos
                  </button>
                  <button
                    type="button"
                    aria-label="mais novos"
                    onClick={() => handleOrderingChange("mais_novos")}
                    className={ordering === "mais_novos" ? "selected" : ""}
                  >
                    Mais novos
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
        <section>
          <div className="car-showcase">
            {orderedCars.map((car) => (
              <CarCard
                key={car._id}
                href="#"
                make={car.make}
                photo={car.photo}
                model={car.model}
                year={car.year!}
                price={car.price}
                version={car.version!}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
