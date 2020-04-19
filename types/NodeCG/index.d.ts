import { OBSSceneChanged as OBSSceneChanged_ } from './OBSSceneChanged'
import { SCActiveRunChanged as SCActiveRunChanged_ } from './SCActiveRunChanged'
import { SCTimerChanged as SCTimerChanged_ } from './SCTimerChanged'
import { SponsorLogoChanged as SponsorLogoChanged_ } from './SponsorLogoChanged'

export namespace NodeCG {
  interface OBSSceneChanged extends OBSSceneChanged_ {}
  interface SCActiveRunChanged extends SCActiveRunChanged_ {}
  interface SCTimerChanged extends SCTimerChanged_ {}
  interface SponsorLogoChanged extends SponsorLogoChanged_ {}
}
