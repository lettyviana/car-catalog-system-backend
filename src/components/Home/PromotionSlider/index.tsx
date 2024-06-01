"use client";
import PromotionLink from "./PromotionLink";

const PromotionSlider = () => {
  return (
    <div className="promotion-slider-container">
      <PromotionLink href="#" className={"promotion-container one"}>
        <div>
          <span>Carros à Pronta-Entrega! Receba em até 72 h!*</span>
        </div>
      </PromotionLink>
      <PromotionLink href="#" className={"promotion-container two"}>
        <div>
          <span>Mês da Troca na NEXTCar!</span>
          <button type="button">Confira Ofertas da Semana!</button>
        </div>
      </PromotionLink>
    </div>
  );
};
export default PromotionSlider;
