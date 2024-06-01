import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CloudinaryUploadWidgetResults } from "next-cloudinary";
import FormInput from "@/components/General/FormInput";
import ImageUpload from "../ImageUpload";
import FormSelect from "@/components/General/FormSelect";
import SubmitButton from "@/components/General/SubmitButton";
import { CarsAdminServices } from "@/lib/services/CarsAdminServices";
import { CarsFamilyPublicServices } from "@/lib/services/CarsFamilyPublicServices";
import { TCarFamily } from "@/lib/types";

const carAdminServices = new CarsAdminServices();
const carFamilyServices = new CarsFamilyPublicServices();

const NewCarForm = ({ params }: { params?: { id: string } }) => {
  const [formInfo, setFormInfo] = useState({
    name: "",
    make: "",
    model: "",
    photo: "",
    familyId: "",
    price: "",
    year: "",
    version: "",
  });
  const [families, setFamilies] = useState<TCarFamily[]>([]);
  const [publicId, setPublicId] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [buttonText, setButtonText] = useState("Atualizar");
  const [focusedField, setFocusedField] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const id = params?.id as string;

  const getFamilies = async () => {
    try {
      const carFamilies = await carFamilyServices.getFamilies();
      setFamilies(carFamilies);
    } catch (error: any) {
      console.error(`Erro ao buscar as famílias: ${error.message}`);
      setError(error.message);
    }
  };

  const getCarInfo = async () => {
    try {
      const response = await carAdminServices.getCarInfoById(id);
      const carData = response?.data?.car;
      setFormInfo(carData);
    } catch (error: any) {
      console.error(`Erro ao buscar as informações do carro: ${error.message}`);
      setError(error.message);
    }
  };

  useEffect(() => {
    getFamilies();
  }, []);

  useEffect(() => {
    if (id) {
      getCarInfo();
    }
  }, [id]);

  useEffect(() => {
    if (formInfo.name && formInfo.make && formInfo.model && formInfo.photo) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [formInfo]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormInfo({
      ...formInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageUpload = (result: CloudinaryUploadWidgetResults) => {
    const info = result.info as object;

    if ("secure_url" in info && "public_id" in info) {
      const url = info.secure_url as string;
      const public_id = info.public_id as string;

      setFormInfo((prevFormInfo) => ({
        ...prevFormInfo,
        photo: url,
      }));
      setPublicId(public_id);
    }
  };

  const removeImage = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await carAdminServices.deleteImage(publicId);
      setFormInfo((prevFormInfo) => ({
        ...prevFormInfo,
        photo: "",
      }));
      setPublicId("");
    } catch (error) {
      console.error(`Erro ao excluir a imagem: ${error}`);
      setError("Erro ao excluir a imagem.");
    }
  };

  const handleFamilySelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setFormInfo({ ...formInfo, familyId: selectedId });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setButtonText("Por favor, aguarde...");

    try {
      await carAdminServices.updateCarInfo(id, formInfo);

      setTimeout(() => {
        router.push("/admin");
      }, 3000);
    } catch (error) {
      console.error(`Erro ao atualizar os dados do veículo: ${error}`);
      setError("Erro ao atualizar os dados do veículo. Tente novamente.");
      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form car-form" onSubmit={handleSubmit}>
      <div className="car-form-container">
        <div className="form-info-container">
          <ImageUpload
            photo={formInfo.photo}
            handleImageUpload={handleImageUpload}
            removeImage={removeImage}
            publicId={publicId}
            alt={`${formInfo.make} • ${formInfo.model}`}
          />
          <div className="car-info">
            <FormInput
              id="name"
              label="Nome do carro"
              autoComplete="on"
              name="name"
              type="text"
              placeholder=""
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField("")}
              value={formInfo.name}
              onChange={onChange}
            />
            <FormInput
              id="make"
              label="Marca do carro"
              autoComplete="on"
              name="make"
              type="text"
              placeholder=""
              onFocus={() => setFocusedField("make")}
              onBlur={() => setFocusedField("")}
              value={formInfo.make}
              onChange={onChange}
            />
            <FormInput
              id="model"
              label="Modelo do carro"
              autoComplete="on"
              name="model"
              type="text"
              placeholder=""
              onFocus={() => setFocusedField("model")}
              onBlur={() => setFocusedField("")}
              value={formInfo.model}
              onChange={onChange}
            />
            <FormInput
              id="price"
              label="Valor do carro"
              autoComplete="on"
              name="price"
              type="number"
              placeholder=""
              onFocus={() => setFocusedField("price")}
              onBlur={() => setFocusedField("")}
              value={formInfo.price}
              onChange={onChange}
            />
            <FormSelect
              id="familyId"
              name="familyId"
              label="A qual família o veículo pertence?"
              value={formInfo.familyId}
              onChange={handleFamilySelect}
              families={families}
            />
            <FormInput
              id="year"
              label="Ano do carro"
              autoComplete="on"
              name="year"
              type="number"
              placeholder=""
              onFocus={() => setFocusedField("year")}
              onBlur={() => setFocusedField("")}
              value={formInfo.year}
              onChange={onChange}
            />
            <FormInput
              id="version"
              label="Versão do carro"
              autoComplete="on"
              name="version"
              type="text"
              placeholder=""
              onFocus={() => setFocusedField("version")}
              onBlur={() => setFocusedField("")}
              value={formInfo.version}
              onChange={onChange}
            />
          </div>
        </div>
        {error && <span className="error-message">{error}</span>}
        {loading && (
          <span className="loading-message">Por favor, aguarde...</span>
        )}
      </div>
      <SubmitButton
        extraStyle={loading ? "loading" : ""}
        disabled={disabled || loading}
        buttonType="submit"
        buttonText={buttonText}
      />
    </form>
  );
};

export default NewCarForm;
