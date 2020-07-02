import { MemoryLabelEnum } from '../../model';
import GLOBAL_CONFIG, { MemoryConfig, MemoryConfigOption } from '../../config'

export default function create(option: MemoryConfigOption = {}) {
    let { label, scope } = GLOBAL_CONFIG.merge(option);
}