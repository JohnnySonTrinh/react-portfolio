import { renderHook } from "@testing-library/react";
import { fetchProfile } from "../api/profileClient";
import useProfileData, {
  preloadProfileData,
  resetProfileDataCacheForTests,
} from "./useProfileData";

jest.mock("../api/profileClient", () => ({
  fetchProfile: jest.fn(),
}));

describe("useProfileData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetProfileDataCacheForTests();
  });

  it("shares the preloaded profile cache with the hook", async () => {
    fetchProfile.mockResolvedValue({
      about: [{ title: "Profile", content: "Ready" }],
      skills: {
        frontend: ["React"],
      },
    });

    await preloadProfileData();

    const { result } = renderHook(() => useProfileData());

    expect(fetchProfile).toHaveBeenCalledTimes(1);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.aboutSections[1]).toEqual([
      { title: "Profile", content: "Ready" },
    ]);
    expect(result.current.skillsByCategory[1][0]).toEqual({
      title: "React",
      icon: "devicon-react-original",
      ariaLabel: "Skill: React",
    });
  });
});
