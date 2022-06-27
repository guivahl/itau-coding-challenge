import NodeCache from 'node-cache'

const SECONDS_FIVE_MINUTES = 60 * 5

interface cacheInfo {
  [key: string]: number
}

export class Cache {
    private cacheService: NodeCache

  constructor() {
    this.cacheService = new NodeCache()
  }

  public addLoginTry(key: string, ttl = SECONDS_FIVE_MINUTES): boolean {
    const newTry = 1
    
    const alreadyCached = this.get(key)

    if (!alreadyCached) return this.cacheService.set<number>(key, newTry, ttl)

    const tries = alreadyCached + newTry

    return this.cacheService.set<number>(key, tries, ttl)
  }
 
  public get(key: string): number | undefined {
    return this.cacheService.get<number>(key)
  }

  public getTtl(key: string): number | undefined {
    return this.cacheService.getTtl(key)
  }
}
