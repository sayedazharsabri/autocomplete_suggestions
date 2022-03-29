export const config: { [key: string]: boolean } = {
    // true means, query match will match name, alt_name and ascii
    CONSIDER_ASCII_AND_ALT_NAME_MATCHING_BUT_SHOW_NAME_ONLY: true,
    // true means, It will only allow 5 attempts per minute
    ENABLE_IP_RATE_LIMITING: true
}