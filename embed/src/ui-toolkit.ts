import { Wrap } from './element-wrap';

export type IconName = keyof typeof SVG_ICONS;

/**
 * Known SVG icons, inlined, all having a 16x16 px viewbox.
 */
const SVG_ICONS = {
    arrowDown:     '<path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>',
    arrowUp:       '<path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>',
    bin:           '<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>',
    bold:          '<path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/>',
    bulletList:    '<path d="M2 7c1.333 0 1.333-2 0-2S.667 7 2 7m0 4c1.333 0 1.333-2 0-2s-1.333 2 0 2m3-5.5h10v1H5zm0 4h10v1H5z"/>',
    caretDown:     '<path d="M8 12 0 4h16z"/>',
    check:         '<path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>',
    code:          '<path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0m6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0"/>',
    enter:         '<path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5"/>',
    exit:          '<path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/><path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>',
    gear:          '<path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>',
    help:          '<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247m2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"/>',
    image:         '<path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/><path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z"/>',
    italic:        '<path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/>',
    link:          '<path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z"/><path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z"/>',
    lock:          '<path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"/>',
    newTab:        '<path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/><path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>',
    numberedList:  '<path d="M5 9.333h10v1H5zm-3.291.166h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054v.507H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338zm.855-2.166h-.635V5.257h-.031l-.598.42V5.11l.629-.443h.635zm2.436-2h10v1H5z"/>',
    pencil:        '<path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>',
    quote:         '<path d="M6.75 4.876A2.993 2.993 0 0 0 1.24 6.508a2.997 2.997 0 0 0 4.604 2.528c-.236.699-.675 1.445-1.397 2.193a.75.75 0 0 0 1.078 1.042C8.196 9.503 7.85 6.494 6.75 4.88zm7.19 0a2.993 2.993 0 0 0-5.51 1.632 2.997 2.997 0 0 0 4.603 2.528c-.235.699-.674 1.445-1.397 2.193a.75.75 0 0 0 1.079 1.042c2.671-2.768 2.324-5.777 1.226-7.392z"/>',
    reply:         '<path d="M5.921 11.9 1.353 8.62a.72.72 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z"/>',
    star:          '<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>',
    strikethrough: '<path d="M6.333 5.686c0 .31.083.581.27.814H5.166a2.8 2.8 0 0 1-.099-.76c0-1.627 1.436-2.768 3.48-2.768 1.969 0 3.39 1.175 3.445 2.85h-1.23c-.11-1.08-.964-1.743-2.25-1.743-1.23 0-2.18.602-2.18 1.607zm2.194 7.478c-2.153 0-3.589-1.107-3.705-2.81h1.23c.144 1.06 1.129 1.703 2.544 1.703 1.34 0 2.31-.705 2.31-1.675 0-.827-.547-1.374-1.914-1.675L8.046 8.5H1v-1h14v1h-3.504c.468.437.675.994.675 1.697 0 1.826-1.436 2.967-3.644 2.967"/>',
    table:         '<path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 2h-4v3h4zm0 4h-4v3h4zm0 4h-4v3h3a1 1 0 0 0 1-1zm-5 3v-3H6v3zm-5 0v-3H1v2a1 1 0 0 0 1 1zm-4-4h4V8H1zm0-4h4V4H1zm5-3v3h4V4zm4 4H6v3h4z"/>',
    times:         '<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>',
    unlock:        '<path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2"/>',
emoji: '<defs><linearGradient id="paint0_linear_2134_9881" x1="-0.394366" y1="16" x2="17.1339" y2="14.6426" gradientUnits="userSpaceOnUse"><stop stop-color="#FF003C"/><stop offset="1" stop-color="#EE00FF"/></linearGradient></defs><path d="M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346628 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9978 5.87895 15.1542 3.84542 13.6544 2.34562C12.1546 0.845814 10.121 0.00223986 8 0ZM8 14.7692C6.66117 14.7692 5.35241 14.3722 4.23922 13.6284C3.12603 12.8846 2.2584 11.8274 1.74605 10.5905C1.2337 9.35356 1.09965 7.99249 1.36084 6.67939C1.62203 5.36629 2.26674 4.16012 3.21343 3.21343C4.16013 2.26674 5.36629 1.62203 6.67939 1.36084C7.99249 1.09965 9.35356 1.2337 10.5905 1.74605C11.8274 2.25839 12.8846 3.12602 13.6284 4.23922C14.3722 5.35241 14.7692 6.66117 14.7692 8C14.7672 9.79468 14.0534 11.5153 12.7843 12.7843C11.5153 14.0534 9.79469 14.7672 8 14.7692ZM4.30769 6.46154C4.30769 6.27897 4.36183 6.1005 4.46326 5.9487C4.56469 5.7969 4.70886 5.67859 4.87753 5.60873C5.0462 5.53886 5.2318 5.52058 5.41085 5.5562C5.58991 5.59181 5.75439 5.67973 5.88349 5.80882C6.01258 5.93792 6.10049 6.10239 6.13611 6.28145C6.17173 6.46051 6.15345 6.64611 6.08358 6.81478C6.01372 6.98345 5.8954 7.12762 5.74361 7.22905C5.59181 7.33048 5.41334 7.38461 5.23077 7.38461C4.98596 7.38461 4.75117 7.28736 4.57806 7.11425C4.40495 6.94114 4.30769 6.70635 4.30769 6.46154ZM11.6923 6.46154C11.6923 6.6441 11.6382 6.82257 11.5367 6.97437C11.4353 7.12617 11.2911 7.24448 11.1225 7.31435C10.9538 7.38421 10.7682 7.40249 10.5891 7.36688C10.4101 7.33126 10.2456 7.24335 10.1165 7.11425C9.98742 6.98516 9.89951 6.82068 9.86389 6.64162C9.82827 6.46256 9.84655 6.27696 9.91642 6.10829C9.98629 5.93962 10.1046 5.79546 10.2564 5.69403C10.4082 5.5926 10.5867 5.53846 10.7692 5.53846C11.014 5.53846 11.2488 5.63571 11.4219 5.80882C11.5951 5.98193 11.6923 6.21672 11.6923 6.46154ZM11.61 10.1538C10.8185 11.5223 9.50231 12.3077 8 12.3077C6.49769 12.3077 5.18231 11.5231 4.39077 10.1538C4.34625 10.0838 4.31635 10.0055 4.30288 9.92358C4.28941 9.84169 4.29264 9.75791 4.31239 9.6773C4.33214 9.59668 4.36798 9.5209 4.41778 9.4545C4.46757 9.3881 4.53028 9.33246 4.60214 9.29092C4.67399 9.24939 4.75351 9.22282 4.8359 9.21281C4.91829 9.2028 5.00185 9.20957 5.08156 9.23269C5.16127 9.25581 5.23548 9.29482 5.29972 9.34737C5.36397 9.39992 5.41692 9.46492 5.45539 9.53846C6.03 10.5315 6.93308 11.0769 8 11.0769C9.06692 11.0769 9.97 10.5308 10.5438 9.53846C10.6255 9.39708 10.7599 9.29391 10.9176 9.25164C11.0752 9.20937 11.2432 9.23147 11.3846 9.31308C11.526 9.39468 11.6292 9.52911 11.6714 9.68678C11.7137 9.84445 11.6916 10.0125 11.61 10.1538Z" fill="url(#paint0_linear_2134_9881)"/>',
giphy: '<defs><linearGradient id="paint0_linear_2134_9882" x1="-0.466071" y1="16" x2="20.2004" y2="14.1086" gradientUnits="userSpaceOnUse"><stop stop-color="#FF003C"/><stop offset="1" stop-color="#EE00FF"/></linearGradient></defs><path d="M17.4541 0C18.2573 0 18.9089 0.650982 18.9092 1.4541V14.5459C18.909 15.2989 18.336 15.9178 17.6025 15.9922L17.4541 16H1.4541L1.30566 15.9922C0.621252 15.9226 0.0774091 15.3787 0.0078125 14.6943L0 14.5459V1.4541C0.000239824 0.65113 0.65113 0.000239788 1.4541 0H17.4541ZM1.4541 14.5459H17.4541V1.4541H1.4541V14.5459ZM5.33301 4.36328C6.45772 4.36328 7.47053 5.15223 7.74219 6.23828C7.77433 6.36675 7.75578 6.50388 7.69043 6.61816C7.62506 6.73225 7.51799 6.81454 7.39355 6.84766C7.26914 6.88069 7.13706 6.86216 7.02637 6.79492C6.91555 6.72753 6.83488 6.61675 6.80273 6.48828C6.64257 5.84723 6.01105 5.36328 5.33301 5.36328C4.94738 5.36337 4.57739 5.52155 4.30469 5.80273C4.03199 6.08396 3.879 6.46558 3.87891 6.86328V9.86328C3.87891 10.261 4.03209 10.6426 4.30469 10.9238C4.57739 11.2051 4.94736 11.3632 5.33301 11.3633C5.71878 11.3633 6.08952 11.2051 6.3623 10.9238C6.6348 10.6426 6.78809 10.2609 6.78809 9.86328V8.86328H5.81836C5.68977 8.86328 5.56651 8.81056 5.47559 8.7168C5.38471 8.62304 5.33301 8.49585 5.33301 8.36328C5.3331 8.2308 5.38474 8.10345 5.47559 8.00977C5.56649 7.91618 5.6899 7.86328 5.81836 7.86328H7.27246C7.4009 7.86328 7.52434 7.9162 7.61523 8.00977C7.70608 8.10345 7.75772 8.2308 7.75781 8.36328V9.86328C7.75781 10.5263 7.50249 11.163 7.04785 11.6318C6.59322 12.1006 5.97593 12.3633 5.33301 12.3633C4.69028 12.3632 4.07368 12.1005 3.61914 11.6318C3.16451 11.163 2.90918 10.5263 2.90918 9.86328V6.86328C2.90927 6.20037 3.16459 5.56446 3.61914 5.0957C4.07369 4.627 4.69022 4.36337 5.33301 4.36328ZM9.69727 4.36328C9.82573 4.36336 9.94919 4.4161 10.04 4.50977C10.1309 4.60345 10.1815 4.7308 10.1816 4.86328V11.8633C10.1816 11.9957 10.1308 12.1231 10.04 12.2168C9.94918 12.3105 9.82575 12.3632 9.69727 12.3633C9.56868 12.3633 9.44542 12.3106 9.35449 12.2168C9.26358 12.123 9.21191 11.9959 9.21191 11.8633V4.86328C9.21201 4.7308 9.26365 4.60345 9.35449 4.50977C9.44539 4.41621 9.56883 4.36328 9.69727 4.36328ZM15.5156 4.36328C15.644 4.36341 15.7676 4.41611 15.8584 4.50977C15.9492 4.60345 15.9999 4.73082 16 4.86328C16 4.9957 15.9491 5.12307 15.8584 5.2168C15.7676 5.31045 15.644 5.36315 15.5156 5.36328H12.6064V7.86328H15.0303C15.1588 7.86328 15.2821 7.91613 15.373 8.00977C15.4639 8.10345 15.5155 8.2308 15.5156 8.36328C15.5156 8.49582 15.4639 8.62304 15.373 8.7168C15.2821 8.81056 15.1589 8.86328 15.0303 8.86328H12.6064V11.8633C12.6064 11.9958 12.5547 12.123 12.4639 12.2168C12.3729 12.3106 12.2497 12.3633 12.1211 12.3633C11.9925 12.3632 11.8692 12.3105 11.7783 12.2168C11.6875 12.1231 11.6367 11.9958 11.6367 11.8633V4.86328C11.6368 4.7308 11.6875 4.60345 11.7783 4.50977C11.8692 4.41611 11.9926 4.36331 12.1211 4.36328H15.5156Z" fill="url(#paint0_linear_2134_9882)"/>',
};

/**
 * Utility class to facilitate the creation of various UI components.
 */
export class UIToolkit {

    // noinspection JSDeprecatedSymbols
    /**
     * Whether we're running on a Mac. `platform` is technically deprecated, but there's no real alternative at the
     * moment so keep it that way.
     */
    static readonly isMac = navigator.platform.toLowerCase().includes('mac');

    /**
     * Create and return a new link (anchor) element.
     * @param text Link text.
     * @param href Href of the anchor.
     * @param options Options for the link
     */
    static a(text: string, href: string, options: {noFollow?: boolean; noOpener?: boolean; noReferrer?: boolean} = {noOpener: true}): Wrap<HTMLAnchorElement> {
        const rel = [];
        if (options.noFollow) {
            rel.push('nofollow');
        }
        if (options.noOpener) {
            rel.push('noopener');
        }
        if (options.noReferrer) {
            rel.push('noreferrer');
        }
        return Wrap.new('a').inner(text).attr({href, target: '_blank', rel: rel.join(' ')});
    }

    /**
     * Create and return a new div element.
     * @param classes Classes to add to the div.
     */
    static div(...classes: (false | null | undefined | string)[]): Wrap<HTMLDivElement> {
        return Wrap.new('div').classes(...classes);
    }

    /**
     * Create and return a new span element.
     * @param text Optional inner text.
     * @param classes Classes to add to the span.
     */
    static span(text?: string, ...classes: (false | null | undefined | string)[]): Wrap<HTMLSpanElement> {
        return Wrap.new('span').inner(text ?? '').classes(...classes);
    }

    /**
     * Create and return a new badge element.
     * @param text Badge text
     * @param classes Classes to add to the div.
     */
    static badge(text: string, ...classes: (false | null | undefined | string)[]): Wrap<HTMLDivElement> {
        return UIToolkit.div('badge').classes(...classes).inner(text);
    }

    /**
     * Create and return a new popup dialog element.
     * @param onSubmit Form submit handler.
     * @param onCancel Form cancel handler (triggered when the user presses Esc).
     */
    static form(onSubmit: () => void, onCancel?: () => void): Wrap<HTMLFormElement> {
        const submit = (f: Wrap<HTMLFormElement>, e: Event) => {
            // Prevent default handling
            e.preventDefault();

            // Mark all inputs touched to show their validation
            [...f.element.getElementsByTagName('input'), ...f.element.getElementsByTagName('textarea')]
                .forEach(el => new Wrap(el).classes('touched'));

            // Run the submit handler if the form is valid
            if (f.element.checkValidity()) {
                onSubmit();
            }
        };
        const cancel = (e: Event) => {
            // If there's a cancel handler provided
            if (onCancel) {
                e.preventDefault();
                onCancel();
            }
        };
        return Wrap.new('form')
            // Intercept form submit event
            .on('submit', submit)
            // Submit the form on Ctrl+Enter and cancel with Esc
            .on('keydown', (f, e) => {
                switch (e.code) {
                    case 'Enter':
                        // Mac OS requires pressing Cmd (= Meta), all others Ctrl
                        return (this.isMac !== e.ctrlKey) && (this.isMac === e.metaKey) &&
                            !e.shiftKey &&
                            !e.altKey &&
                            submit(f, e);
                    case 'Escape':
                        return !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey && cancel(e);
                }
            });
    }

    /**
     * Create and return a new input element.
     */
    static input(name: string, type = 'text', placeholder: string | null | undefined = null, autocomplete: string | null | undefined = null, required?: boolean): Wrap<HTMLInputElement> {
        return Wrap.new('input')
            .classes('input')
            .attr({name, type, placeholder, autocomplete, required: required ? 'required' : null, size: '1'})
            // Add the touched class on blur, which is used to highlight invalid input
            .on('blur', t => t.classes('touched'));
    }

    /**
     * Create and return a new textarea element.
     */
    static textarea(placeholder:  null | undefined | string, required: boolean, autoExpand: boolean): Wrap<HTMLTextAreaElement> {
        return Wrap.new('textarea')
            .attr({placeholder, required: required ? 'required' : null})
            // Add the touched class on blur, which is used to highlight invalid input
            .on('blur', t => t.classes('touched'))
            // Enable automatic height adjusting on input, if needed
            .on('input', t =>
                autoExpand &&
                t.style('height:auto')
                    .style(`height:${Math.min(Math.max(t.element.scrollHeight + t.element.offsetHeight - t.element.clientHeight, 75), 400)}px`));
    }

    /**
     * Create and return a new button element.
     * @param label Label of the button (HTML).
     * @param onClick Button's click handler.
     * @param classes Additional button classes to add.
     */
    static button(label: string, onClick?: (btn: Wrap<HTMLButtonElement>, e: MouseEvent) => void,  ...classes: (false | null | undefined | string)[]): Wrap<HTMLButtonElement> {
        return Wrap.new('button').classes('btn', ...classes).html(label).attr({type: 'button'}).click(onClick);
    }

    /**
     * Create and return a new button with an icon inside.
     * @param icon Icon in the button.
     * @param title Optional title of the button.
     * @param onClick Button's click handler.
     * @param classes Additional button classes to add.
     */
    static iconButton(icon: IconName, title: string, onClick?: (btn: Wrap<HTMLButtonElement>, e: MouseEvent) => void,  ...classes: (false | null | undefined | string)[]): Wrap<HTMLButtonElement> {
        return this.button('', onClick, ...classes).append(this.icon(icon)).attr({title});
    }

    /**
     * Create and return a new tool button with an icon.
     * @param icon Icon in the button.
     * @param title Optional title of the button.
     * @param onClick Button's click handler.
     * @param classes Additional button classes to add.
     */
    static toolButton(icon: IconName, title: string, onClick: (btn: Wrap<HTMLButtonElement>, e: MouseEvent) => void,  ...classes: (false | null | undefined | string)[]): Wrap<HTMLButtonElement> {
        return this.iconButton(icon, title, onClick, 'btn-tool', ...classes).attr({tabindex: '-1'});
    }

    /**
     * Create and return a new submit button element.
     * @param title Title of the button, and, if iconOnly is false, also its label.
     * @param iconOnly Whether to draw a "carriage return" icon instead of text.
     */
    static submit(title: string, iconOnly: boolean): Wrap<HTMLButtonElement> {
        const btn = Wrap.new('button').classes('btn', 'btn-primary', 'fw-bold').attr({type: 'submit'});
        return iconOnly ?
            btn.append(this.icon('enter').classes('submit-icon')).attr({title}) :
            btn.inner(title);
    }

    /**
     * Create and return an SVG element for the specified named icon.
     */
    static icon(icon: IconName): Wrap<SVGElement> {
        return Wrap.newSvg().attr({viewBox: '0 0 16 16', 'data-icon': icon}).classes('icon').html(SVG_ICONS[icon]); 
      }
}
