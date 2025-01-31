import { useRef } from "react";
import { useAtom } from "jotai";
import Image from "next/image";
import { imageAtom } from "@/atoms/image-atom";
import { IoMdAdd } from "react-icons/io";

export default function UploadImage() {
  const [image, setImage] = useAtom(imageAtom);
  const hiddenFileInput = useRef<any>(null);

  const handleChange = (event: any) => {
    setImage(event.target.files[0]);
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  return (
    <>
      {image === null ? (
        <div
          onClick={handleClick}
          className="w-24 h-24 cursor-pointer bg-gray-500 rounded-2xl flex justify-center items-center"
        >
          <IoMdAdd size={50} color="white" />
        </div>
      ) : (
        <Image
          className="w-24 h-24 rounded-2xl object-cover"
          width={600}
          height={600}
          src={URL.createObjectURL(image)}
          alt=""
        />
      )}
      <input
        type="file"
        name="myImage"
        className="hidden"
        ref={hiddenFileInput}
        onChange={handleChange}
      />
    </>
  );
}
