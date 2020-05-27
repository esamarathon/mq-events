import { OBSSceneChanged as OBSSceneChanged_ } from './OBSSceneChanged'
import { OBSStreamingStatusChanged as OBSStreamingStatusChanged_ } from './OBSStreamingStatusChanged'
import { SCActiveRunChanged as SCActiveRunChanged_ } from './SCActiveRunChanged'
import { SCTimerChanged as SCTimerChanged_ } from './SCTimerChanged'
import { SponsorLogoChanged as SponsorLogoChanged_ } from './SponsorLogoChanged'
import { VideoPlayed as VideoPlayed_ } from './VideoPlayed'

export namespace NodeCG {
  interface OBSSceneChanged extends OBSSceneChanged_ {}
  interface OBSStreamingStatusChanged extends OBSStreamingStatusChanged_ {}
  interface SCActiveRunChanged extends SCActiveRunChanged_ {}
  interface SCTimerChanged extends SCTimerChanged_ {}
  interface SponsorLogoChanged extends SponsorLogoChanged_ {}
  interface VideoPlayed extends VideoPlayed_ {}
}
