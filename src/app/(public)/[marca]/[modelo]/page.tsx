"use client";
import { useEffect, useState } from "react";
import PromotionSlider from "@/components/Home/PromotionSlider";
import SearchBox from "@/components/Home/SearchBox";
import { CarsPublicService } from "@/lib/services/CarsPublicService";
import { TCarInfo } from "@/lib/types";

const carServices = new CarsPublicService();

export default function Home() {
  const [cars, setCars] = useState<TCarInfo[]>([]);

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

  return (
    <>
      <PromotionSlider />
      <main className="main-car-model-section">
        <SearchBox />
        <section></section>
      </main>
    </>
  );
}
