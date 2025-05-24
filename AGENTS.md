
---

## 1 · App Brief

You are contributing to a playful mobile app that **turns a user’s dog or cat into a talking 3-D avatar**.  
The workflow is:

1. **Onboarding** – The user creates a profile for their pet and snaps a photo of their pet ➜ we POST the photo to the `/mesh` API to create a `.glb` model.  
2. **Processing** – poll until the mesh job is `done`, download the `.glb`, persist its local path in `store/pet.ts`.  
3. **Live Pet** – render the mesh with Three-JS (`expo-gl`, `react-three/fiber`) and, while recording, send camera frames to **OpenAI Vision** with a prompt such as
   `You are {PetName}. Write a one-sentence first-person thought about how you feel right now.`  
4. **Voice-over** – The avatar should speak the caption aloud with `expo-speech`; avatar animations shuold be based on “mood” keywords.

---

## 2 · Repository Map

| Path              | Purpose                                                                |
|-------------------|------------------------------------------------------------------------|
| `app/`            | Expo-Router route files *(screens are inline)*                         |
| `app/(onboarding)/` | `profile/` (collect name, photo) & `processing/` (poll mesh)         |
| `app/(main)/`     | Tabs → `pet/`, `gallery/`, `settings/`                                 |
| `components/`     | Pure UI atoms / molecules                                              |
| `services/`       | Network helpers (`mesh.ts`, later `vision.ts`)                         |
| `store/`          | Zustand slices (`pet.ts`, `auth.ts`)                                   |
| `three/`          | Three-JS loaders, animation maps                                       |
| `utils/`          | **Stateless helpers used by multiple features** (e.g. `debounce()`, unit converters) |
| `scripts/`        | Utility CLIs (e.g. `reset-project.js`)                                 |
| `constants/`      | Theme & color tokens            

---

## 3 · Dev Environment

# one-time
pnpm install          # Node >= 20; pnpm is preferred for determinism
pnpm expo start --web # web preview (Metro LAN tunnel ok too)

# unit / integration tests (to be added)
pnpm test

# lint + types
pnpm run lint
pnpm run type-check
