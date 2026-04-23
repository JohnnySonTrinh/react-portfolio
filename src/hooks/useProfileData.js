import { useEffect, useState } from "react";
import { fetchProfile } from "../api/profileClient";
import { transformProfile } from "../data/profileTransformers";

let cachedProfile = null;
let cachedProfilePromise = null;

async function loadProfile() {
  if (cachedProfile) {
    return cachedProfile;
  }

  if (!cachedProfilePromise) {
    cachedProfilePromise = fetchProfile()
      .then((profile) => {
        cachedProfile = transformProfile(profile);
        return cachedProfile;
      })
      .finally(() => {
        cachedProfilePromise = null;
      });
  }

  return cachedProfilePromise;
}

const emptyProfile = transformProfile({});

export function preloadProfileData() {
  return loadProfile();
}

export function resetProfileDataCacheForTests() {
  cachedProfile = null;
  cachedProfilePromise = null;
}

export default function useProfileData() {
  const [profile, setProfile] = useState(cachedProfile || emptyProfile);
  const [isLoading, setIsLoading] = useState(!cachedProfile);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    if (cachedProfile) {
      return undefined;
    }

    loadProfile()
      .then((loadedProfile) => {
        if (!isMounted) {
          return;
        }

        setProfile(loadedProfile);
        setError(null);
      })
      .catch((loadError) => {
        if (!isMounted) {
          return;
        }

        setError(loadError);
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    ...profile,
    isLoading,
    error,
  };
}
