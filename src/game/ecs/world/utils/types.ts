import { Scene } from "@babylonjs/core";

export type EntityId = string;
export type Tag = string;
export type Value = any;

// hierarchy parent/child?
// https://github.com/SanderMertens/ecs-faq#how-to-1
export type TagMap = Map<Tag, Value>;

export interface World {
  scene: Scene;
  entities: Map<EntityId, TagMap>;
  systems: Set<System>;
  eventQueue: WorldEvent[];
}

export type Pair = [EntityId, Tag, EntityId];

export interface System {
  requirements: (Tag|Pair)[];
  update: (world: World, entity: EntityId) => void;
  events?: { [eventName: string]: EventHandler };
}

export type EventHandler = (world: World, eventData: any) => void;

export interface WorldEvent {
  name: string;
  data: { [key: string]: any; }
}
