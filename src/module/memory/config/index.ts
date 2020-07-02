/**
 * @version 1.0.0
 * @author galadrielme
 * @since 2020/7/2
 * @description 配置类型
 * ┌────────────┬────────────┐
 * │ label      │            │
 * ├────────────┼────────────┤
 * │ scope      │            │
 * └────────────┴────────────┘
 */

import { MemoryLabelEnum } from '../model';
import { getLabel } from '../utils/label';

/**
 * @version 1.0.0
 * @author galadrielme
 * @since 2020/7/2
 * @description 传参参数,label和scope均为可选值
 */
export interface MemoryConfigOption {
    label?: MemoryLabelEnum;
    scope?: string;
}

/**
 * @version 1.0.0
 * @author galadrielme
 * @since 2020/7/2
 * @description 实际所需参数,label和scope均为必选值
 */
export class MemoryConfig {

    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     */
    label: MemoryLabelEnum = MemoryLabelEnum.CACHE;

    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     */
    scope: string = "";

    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     * @param option MemoryConfigOption
     * @description 配置设定,设定使用可选参数
     */
    set(option: MemoryConfigOption) {
        return Object.assign(this, this.merge(option));
    }

    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     * @param option MemoryConfigOption
     * @description 合并参数
     */
    merge({ label, scope }: MemoryConfigOption) {
        if (typeof scope != 'string') scope = '';
        label = getLabel(label, this.label);
        return { label, scope };
    }
}
/**
 * @version 1.0.0
 * @author galadrielme
 * @since 2020/7/2
 * @description 全局配置
 */
const GLOBAL_CONFIG = new MemoryConfig();
export default GLOBAL_CONFIG;