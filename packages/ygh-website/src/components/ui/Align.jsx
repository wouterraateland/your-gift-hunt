import styled from 'styled-components'

const AlignLeft = styled.div`text-align: left;`
AlignLeft.displayName = 'AlignLeft'

const AlignRight = styled.div`text-align: right;`
AlignRight.displayName = 'AlignRight'

const AlignCenter = styled.div`text-align: center;`
AlignCenter.displayName = 'AlignCenter'

const AlignJustify = styled.div`text-align: justify;`
AlignJustify.displayName = 'AlignJustify'

const Align = styled.div`text-align: inherit;`
Align.displayName = 'Align'

Align.Left = AlignLeft
Align.Right = AlignRight
Align.Center = AlignCenter
Align.Justify = AlignJustify

export default Align
