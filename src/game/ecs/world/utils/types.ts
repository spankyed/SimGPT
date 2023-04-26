import { Scene } from "@babylonjs/core";

export type EntityId = string;
export type Tag = string;
export type Value = any;
export type Pair = [EntityId, Tag, EntityId];
export type Data = { [key: string]: any; };
export type EventHandler = (world: World, data: Data) => void;
export type TagMap = Map<Tag, Value>; // hierarchy parent/child: https://github.com/SanderMertens/ecs-faq#how-to-1
export type EntityRefs = Set<EntityId>;
export type EntityMap = Map<EntityId, TagMap>;
export interface System {
  name: string;
  requirements?: (Tag | Pair)[];
  entityRefs: EntityRefs;
  create?: (world: World, entityRefs: EntityRefs) => any;
  update?: (world: World, id: EntityId) => void;
  events?: { [eventName: string]: EventHandler };
}

export interface World {
  scene: Scene;
  entities: EntityMap;
  systems: Set<System>;
  eventQueue: WorldEvent[];
  update: () => void;
}

export interface WorldEvent {
  name: string;
  data: Data;
}
