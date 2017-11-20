const requireContext = require.context('./list', false, /\.json$/);
const markers = requireContext.keys().map(requireContext);

export default markers;