import { fileUpload } from "../../src/helpers/fileUpload";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "di8bam6rc",
  api_key: "576579677988347",
  api_secret: "9zEHl59zUordTfalmlXh8Es0Ee8",
  secure: true,
});

describe("Pruebas en fileUpload", () => {
  test("debe de subir el archivo correctamente a cloudnary", async () => {
    const imageUrl =
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80";
    const resp = await fetch(imageUrl);
    const blob = await resp.blob();
    const file = new File([blob], "foto.jpg");

    const url = await fileUpload(file);
    expect(typeof url).toBe("string");

    const segments = url.split("/");
    const imageId = segments[segments.length - 1].replace(".jpg", "");
    const cloudResp = await cloudinary.api.delete_resources(
      ["journal/" + imageId],
      { resource_type: "image" }
    );
  });
  test("debe de retornar null", async () => {
    const file = new File([], "foto.jpg");

    const url = await fileUpload(file);
    expect(url).toBe(null);
  });
});
