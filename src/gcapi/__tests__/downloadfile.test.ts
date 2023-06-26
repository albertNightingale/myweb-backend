
import { Auth } from "googleapis";

import { downloadFile } from "../downloadfile";

jest.mock("googleapis", () => ({
  Auth: {
    OAuth2Client: jest.fn()
  },
  google: {
    drive: jest.fn(() => ({
      files: {
        get: jest.fn(() => ({
          data: {
            webContentLink: "https://drive.google.com/uc?id=1XJ4Z2Z2Z2Z2Z2Z2Z2Z2Z2Z2Z2Z2Z2Z2&export=download"
          }
        }))
      }
    }))
  }
}));

describe("downloadFile", () => {
  it("should return the webContentLink", async () => {
    const authClient = new Auth.OAuth2Client();
    const fileID = "1XJ4Z2Z2Z2Z2Z2Z2Z2Z2Z2Z2Z2Z2Z2Z2";
    const result = await downloadFile(authClient, fileID);
    expect(result).toEqual("https://drive.google.com/uc?id=1XJ4Z2Z2Z2Z2Z2Z2Z2Z2Z2Z2Z2Z2Z2Z2&export=download");
  });
});